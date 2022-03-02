module.exports = function (host, paths) {
    const middleware = paths[host];

    if (!middleware) {
        return;
    }

    return middleware;
};
