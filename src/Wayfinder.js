const domainMatcher = require("./matchers/domain");

/**
 * A middleware that routes based on the `maps` provided.
 * 
 * @public
 */
module.exports = class Wayfinder {
    /**
     * Creates a new `Wayfinder` with the given `options`.
     *
     * @param {Object} options - The options for both the `Wayfinder` and the `WayfinderMatcher`.
     * @param {WayfinderMatcher} options.matcher - The matching algorithm of the `Wayfinder`.
     * @param {Object} options.match - The options for the matching algorithm of the `Wayfinder.
     *
     * @public
     */
    constructor(options) {
        this.#opts = options || {};

        this.#matcher = this.#opts.matcher || domainMatcher;
    }

    /**
     * The middleware function of the `Wayfinder`.
     *
     * @type {Function}
     * 
     * @public
     */
    middleware = (req, res, next) => {
        const middleware = this.#matcher.match(
            req,
            this.#maps,
            this.#opts.match || {}
        );

        if (middleware) {
            middleware(req, res, next);
        }

        if (this.#maps["*"]) {
            this.#maps["*"](req, res, next);
        }

        next();
    };

    /**
     * The options of the `Wayfinder`.
     *
     * @type {Object}
     * @private
     */
    #opts;

    /**
     * The matching algorithm of the `Wayfinder`.
     *
     * @type {WayfinderMatcher}
     * @private
     */
    #matcher;

    /**
     * The maps of the `Wayfinder`.
     *
     * @type {Object.<string, Function>}
     * @private
     */
    #maps = {
        "*": function (req, res, next) {
            next();
        },
    };

    /**
     * Initializes a new map to the `Wayfinder`.
     *
     * @param {string} map - The `map` that the `Wayfinder` should match.
     * @param {Function} middleware - The middleware function this `map` should map to.
     * @returns {void}
     * @public
     */
    register = (map, middleware) => {
        this.#maps[map] = middleware;
    };
};
