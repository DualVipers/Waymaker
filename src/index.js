const Waymaker = require("./Waymaker");

module.exports = Waymaker;

const DomainMatcher = require("./matchers/domain");
const SubdomainMatcher = require("./matchers/subdomain");

module.exports.matchers = {
    DomainMatcher,
    SubdomainMatcher,
};
