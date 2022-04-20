import type { Request, Response, NextFunction } from "express";

/**
 * A matcher that matches **specific** domains to their middlewares.
 *
 * @type {WaymakerMatcher}
 * @public
 */
export default {
    /**
     * Matches **specific** domains to their middlewares based on the provided info.
     *
     * @param {Request} request - The `request` that the `Waymaker` should match.
     * @param {Object.<string, Function>} maps - The maps this `request` should map to.
     *
     * @returns {Function | void} Either the match middleware function or void.
     * @public
     */
    match: (
        request: Request,
        maps: {
            [key: string]: (
                req: Request,
                res: Response,
                next: NextFunction
            ) => void;
        }
    ): ((req: Request, res: Response, next: NextFunction) => void) | void => {
        const middleware = maps[request.hostname];

        if (!middleware) {
            return;
        }

        return middleware;
    },
};
