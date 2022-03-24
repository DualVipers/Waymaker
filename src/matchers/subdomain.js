/**
 * A matcher that matches subdomains to their middlewares.
 *
 * @type {WayfinderMatcher}
 * @public
 */
module.exports = {
    /**
     * Matches subdomains to their middlewares based on the provided info.
     *
     * @param {Object} request - The `request` that the `Wayfinder` should match.
     * @param {Object.<string, Function>} maps - The maps this `request` should map to.
     *
     * @returns {Function | void} Either the match middleware function or void.
     * @public
     */
    match: function (request, maps, options) {
        const baseDomainLength = options.baseDomainLength;

        const baseDomain = options.baseDomain;

        const splitDomain = baseDomain ? baseDomain.split(".") : undefined;

        const subdomain = baseDomain
            ? request.hostname
                  .split(".")
                  .slice(-splitDomain.length)
                  .join(".") == baseDomain
                ? request.hostname
                      .split(".")
                      .splice(-splitDomain.length)
                      .join(".")
                : "*"
            : request.hostname
                  .split(".")
                  .splice(-(baseDomainLength || 2))
                  .join(".");

        const middleware = maps[subdomain];

        if (!middleware) {
            return;
        }

        return middleware;
    },
};
