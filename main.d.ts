interface WaymakerMatcher {
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
        request: Object,
        mappings: Object<string, Function>,
        options: Object
    ): Function | void;
}
