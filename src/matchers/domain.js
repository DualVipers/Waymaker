/**
 * A matcher that matches **specific** domains to their middlewares.
 * 
 * @public
 */
module.exports = function (request, mappings, options) {
    const middleware = mappings[request.hostname];

    if (!middleware) {
        return;
    }

    return middleware;
};
