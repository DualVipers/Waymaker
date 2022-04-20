import type { Request, Response, NextFunction } from "express";

import type WaymakerMatcher from "./WaymakerMatcher";
import domainMatcher from "./matchers/domian";

/**
 * A middleware that routes based on the `maps` provided.
 *
 * @public
 */
export default class Waymaker {
    /**
     * Creates a new `Waymaker` with the given `options`.
     *
     * @param {Object} options - The options for both the `Waymaker` and the `WaymakerMatcher`.
     * @param {WaymakerMatcher} options.matcher - The matching algorithm of the `Waymaker`.
     * @param {Object} options.match - The options for the matching algorithm of the `Waymaker.
     *
     * @public
     */
    constructor(options?: { [key: string]: unknown }) {
        this.#opts = options || {};

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.#matcher = this.#opts.matcher || domainMatcher;
    }

    /**
     * The middleware function of the `Waymaker`.
     *
     * @type {Function}
     *
     * @public
     */
    middleware: (req: Request, res: Response, next: NextFunction) => void = (
        req: Request,
        res: Response,
        next: NextFunction
    ): ((req: Request, res: Response, next: NextFunction) => void) | void => {
        const middleware = this.#matcher.match(
            req,
            this.#maps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.#opts.match || {}
        );

        if (middleware) {
            return middleware(req, res, next);
        }

        if (this.#maps["*"]) {
            return this.#maps["*"](req, res, next);
        }

        next();
    };

    /**
     * The options of the `Waymaker`.
     *
     * @type {Object}
     * @private
     */
    #opts: { [key: string]: unknown };

    /**
     * The matching algorithm of the `Waymaker`.
     *
     * @type {WaymakerMatcher}
     * @private
     */
    #matcher: WaymakerMatcher;

    /**
     * The maps of the `Waymaker`.
     *
     * @type {Object.<string, Function>}
     * @private
     */
    #maps: {
        [key: string]: (
            req: Request,
            res: Response,
            next: NextFunction
        ) => void;
    } = {
        "*": (req: Request, res: Response, next: NextFunction) => {
            next();
        },
    };

    /**
     * Initializes a new map to the `Waymaker`.
     *
     * @param {string} map - The `map` that the `Waymaker` should match.
     * @param {Function} middleware - The middleware function this `map` should map to.
     * @returns {void}
     * @public
     */
    register = (
        map: string,
        middleware: (req: Request, res: Response, next: NextFunction) => void
    ): void => {
        this.#maps[map] = middleware;
    };
}
