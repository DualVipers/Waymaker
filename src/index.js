const Wayfinder = require("./Wayfinder");

module.exports = Wayfinder;

const DomainMatcher = require("./matchers/domain");
const SubdomainMatcher = require("./matchers/subdomain");

module.exports.matchers = {
    DomainMatcher,
    SubdomainMatcher,
};
