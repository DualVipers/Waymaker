import type { Request, Response, NextFunction } from "express";

/**
 * A matching algorithm for `Waymaker`.
 *
 * @public
 */
type WaymakerMatcher = {
    /**
     * Matches a request to the provided mappings.
     *
     * @param {Object} request - The `request` that the `Waymaker` should match.
     * @param {Object.<string, Function>} mappings - The maps this `request` should match to.
     * @param {Object} options - The user provided options for the `WaymakerMatcher`.
     *
     * @returns {Function | void} Either the match middleware function or void.
     * @public
     */
    match(
        request: Request,
        mappings: {
            [key: string]: (
                req: Request,
                res: Response,
                next: NextFunction
            ) => void;
        },
        options: { [key: string]: unknown }
    ): ((req: Request, res: Response, next: NextFunction) => void) | void;
};

export default WaymakerMatcher;
