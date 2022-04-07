/**
 * A matcher that matches **specific** domains to their middlewares.
 *
 * @type {WayfinderMatcher}
 * @public
 */
module.exports = {
    /**
     * Matches **specific** domains to their middlewares based on the provided info.
     *
     * @param {Object} request - The `request` that the `Wayfinder` should match.
     * @param {Object.<string, Function>} maps - The maps this `request` should map to.
     *
     * @returns {Function | void} Either the match middleware function or void.
     * @public
     */
    match: (request, maps) => {
        const middleware = maps[request.hostname];

        if (!middleware) {
            return;
        }

        return middleware;
    },
};
