const {
  checkNameRestrictions,
} = require("./checkRestrictions/name/checkNameRestrictions");
const { exportResult } = require("./utils/exportResult");
const { checkRestrictions } = require("./checkRestrictions/checkRestrictions");
module.exports = { askReduction };

/**
 *
 * @param redeemInfo
 * @param promoCode
 * @returns {Promise<{promocode_name: *}>}
 */
async function askReduction(redeemInfo, promoCode) {
  // Bool: Do redeemInfo and promoCode have the same info?
  let reason = checkNameRestrictions(redeemInfo, promoCode);

  // If true, check restrictions validity
  if (reason.isOK) {
    reason = checkRestrictions(redeemInfo.arguments, promoCode.restrictions);
  }

  // Output accepted with advantage or denied with reason
  return exportResult(reason, promoCode);
}
