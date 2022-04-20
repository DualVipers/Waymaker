import Waymaker from "./Waymaker";

export default Waymaker;

export { default as WaymakerMatcher } from "./WaymakerMatcher";

import DomainMatcher from "./matchers/domian";
import SubdomainMatcher from "./matchers/subdomain";

export const matchers = {
    DomainMatcher,
    SubdomainMatcher,
};
