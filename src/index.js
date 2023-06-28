const {
  verifyEmail,
  isDisposableEmail,
  isFreeEmail,
} = require("@devmehq/email-validator-js");
const EmailValidator = require("./smtpchecker");
const checkBlacklist = require("./blacklistchecker");
const emailDeepvalidator = new EmailValidator();
function scoreGeneratorAlgorithm(
  report = {
    validFormat: false,
    validMXRecord: false,
    validDomain: false,
    validMailbox: false,
    isDisposable: false,
    isFree: false,
    isBlackListed: false,
  }
) {
  return {
    score: 0,
    report,
  };
}
module.exports = {
  validate: async function (email) {
    // const validationResult = await verifyEmail({
    //   emailAddress: email,
    //   verifyMx: true,
    //   verifySmtp: true,
    //   timeout: 3000,
    // });
    const isFree = isFreeEmail(email);
    const isDisposable = isDisposableEmail(email);
    const deepValidationResult = await emailDeepvalidator.verify(email);
    const blacklistCheck = await checkBlacklist(email);
    return {
      ...scoreGeneratorAlgorithm({
        validDomain: deepValidationResult.validDomain,
        validMXRecord: deepValidationResult.validDomain,
        validMailbox: deepValidationResult.validMailbox,
        validFormat: deepValidationResult.wellFormed,
        isFree,
        isDisposable,
        isBlackListed: blacklistCheck.blackListed,
      }),
    };
  },
};
