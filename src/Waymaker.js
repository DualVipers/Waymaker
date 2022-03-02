const domainMatcher = require("./matchers/domain");

module.exports = function (options) {
    /**
     * Initialize a new `Wayfinder` with the given `options`.
     *
     * @param {Object} options
     * @param {WayfinderMatcher} options.matcher - The matching algorithm of the `Wayfinder`.
     * @param {Object} options.match - The options for the matching algorithm of the `Wayfinder
     * `.
     * @return {Wayfinder} - A `Wayfinder` which can be used as a middleware function.
     * @public
     */
    const wayfinder = function (req, res, next) {
        const middleware = this.matcher(
            req,
            this.paths,
            this.opts.match || {}
        );

        if (middleware) {
            middleware(req, res, next);
        }

        if (this.paths["*"]) {
            this.paths["*"](req, res, next);
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
     * The path mappings of the `Wayfinder`.
     *
     * @private
     */
    wayfinder.paths = {
        "*": function (_req, _res, next) {
            next();
        },
    };

    /**
     * Initializes a new `path` to the `Wayfinder`.
     *
     * @param {string} path - The `path` that the `Wayfinder` should match.
     * @param {Function} middleware - The middleware function this `path` should map to.
     * @returns {void}
     * @public
     */
    wayfinder.register = function (path, middleware) {
        this.paths[path] = middleware;
    };

    return wayfinder;
};
