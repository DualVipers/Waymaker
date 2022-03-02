const domainMatcher = require("./matchers/domain");

module.exports = function (options) {
    /**
     * Initialize a new `Wayfinder` with the given `options`.
     *
     * @param {Object} options
     * @param {WayfinderMatcher} options.matcher - The matching algorithm of the `Wayfinder`.
     * @param {Object} options.match - The options for the matching algorithm of the `Wayfinder.
     * `.
     * @return {Wayfinder} - A `Wayfinder` which can be used as a middleware function.
     * @public
     */
    const wayfinder = function (req, res, next) {
        const middleware = this.matcher(
            req,
            this.mappings,
            this.opts.match || {}
        );

        if (middleware) {
            middleware(req, res, next);
        }

        if (this.mappings["*"]) {
            this.mappings["*"](req, res, next);
        }

        next();
    };

    /**
     * The options of the `Wayfinder`.
     *
     * @private
     */
    wayfinder.opts = options || {};

    /**
     * The matching algorithm of the `Wayfinder`.
     *
     * @private
     */
    wayfinder.matcher = wayfinder.opts.matcher || domainMatcher;

    /**
     * The mappings of the `Wayfinder`.
     *
     * @private
     */
    wayfinder.mappings = {
        "*": function (_req, _res, next) {
            next();
        },
    };

    /**
     * Initializes a new `mapping` to the `Wayfinder`.
     *
     * @param {string} mapping - The `mapping` that the `Wayfinder` should match.
     * @param {Function} middleware - The middleware function this `mapping` should map to.
     * @returns {void}
     * @public
     */
    wayfinder.register = function (mapping, middleware) {
        this.mappings[mapping] = middleware;
    };

    return wayfinder;
};
