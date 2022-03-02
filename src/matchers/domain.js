/**
 * A matcher that matches **specific** domains to their middlewares.
 * 
 * @public
 */
module.exports = function (request, paths) {
    const middleware = paths[request.hostname];

    if (!middleware) {
        return;
    }

    return middleware;
};
