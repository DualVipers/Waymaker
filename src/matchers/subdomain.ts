import type { Request, Response, NextFunction } from "express";

/**
 * A matcher that matches subdomains to their middlewares.
 *
 * @type {WaymakerMatcher}
 * @public
 */
export default {
    /**
     * Matches subdomains to their middlewares based on the provided info.
     *
     * @param {Object} request - The `request` that the `Waymaker` should match.
     * @param {Object.<string, Function>} maps - The maps this `request` should map to.
     * @param {Object} options - The user provided options for the `WaymakerMatcher`.
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
        },
        options: { [key: string]: unknown }
    ): ((req: Request, res: Response, next: NextFunction) => void) | void => {
        const baseDomainLength: number | void = options.baseDomainLength as
            | number
            | void;

        const baseDomain: string = options.baseDomain as string;

        const splitDomain = baseDomain ? baseDomain.split(".") : [];

        const subdomain = baseDomain
            ? request.hostname
                  .split(".")
                  .slice(-splitDomain.length)
                  .join(".") == baseDomain
                ? request.hostname
                      .split(".")
                      .slice(0, -splitDomain.length)
                      .join(".")
                : "*"
            : request.hostname
                  .split(".")
                  .slice(0, -(baseDomainLength || 2))
                  .join(".");

        const middleware = maps[subdomain];

        if (!middleware) {
            return;
        }

        return middleware;
    },
};
