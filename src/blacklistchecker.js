const { logger } = require("./logger");

const dns = require("dns").promises;
const blacklistDomains = [
  "zen.spamhaus.org",
  "pbl.spamhaus.org",
  "xbl.spamhaus.org",
  "dnsbl.dnsbl.info",
  "multi.surbl.org",
  "b.barracudacentral.org",
  "bl.spamcop.net",
  "dnsbl.httpbl.net",
  "all.spamrats.com",
  "bl.spamcannibal.org",
  "dnsbl.sorbs.net",
  "bl.score.senderscore.com",
];

const blacklistDomain = "zen.spamhaus.org";
async function checkBlacklist(email) {
  let blackListed = false;
  try {
    if (!email.includes("@")) {
      throw new Error(`"${address}" is not a valid email address`);
    }
    const [, domain] = email.split("@");
    const lookupResult = await dns.resolve4(`${domain}.${blacklistDomain}`);
    if (lookupResult.length > 0) {
      blackListed = true;
      logger.debug(`Domain '${domain}' is listed in the blacklist.`);
      return { blackListed };
    } else {
      blackListed = false;
      logger.debug(`Domain '${domain}' is not listed in the blacklist.`);
      return { blackListed };
    }
  } catch (error) {
    logger.debug(
      `Error occurred while checking the blacklist: ${error.message}`,
      { error }
    );
  }
  return { blackListed };
}

module.exports = checkBlacklist;
