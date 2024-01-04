const {
  checkNameRestrictions,
} = require("./checkRestrictions/name/checkNameRestrictions");
const { exportResult } = require("./utils/exportResult");
module.exports = { askReduction };

async function askReduction(redeemInfo, promoCode) {
  // Bool: Do redeemInfo and promoCode have the same info?
  let reason = checkNameRestrictions(redeemInfo, promoCode);

  // Output accepted with advantage or denied with reason
  return exportResult(reason, promoCode);
}
