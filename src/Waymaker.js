const domainMatcher = require("./matchers/domain");

/**
 * Initialize a new `Wayfinder` with the given `options`.
 *
 * @param {Object} options
 * @return {Wayfinder} - A wayfinder which can be used as a middleware function
 * @public
 */
module.exports = function (options) {
    const wayfinder = function (req, res, next) {
        const middleware = this.matcher(
            req.hostname,
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

    wayfinder.opts = options || {};

    wayfinder.matcher = wayfinder.opts.matcher || domainMatcher;

    wayfinder.paths = {
        "*": function (_req, _res, next) {
            next();
        },
    };

    wayfinder.register = function (path, middleware) {
        this.paths[path] = middleware;
    };

    return wayfinder;
};
