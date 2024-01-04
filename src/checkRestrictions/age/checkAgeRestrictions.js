const { createReasonError } = require("../../utils/createReasonError");
module.exports = { checkAgeRestrictions };

/**
 *
 * @param redeemAge
 * @param restrictionAge
 * @returns {{isOK: boolean}|{nameError, messageError, isOR: boolean}}
 */
function checkAgeRestrictions(redeemAge, restrictionAge) {
  // Initialise output variable
  let reason = { isOK: true };

  // If the PromoCode contains age restrictions and
  // the user does not meet them, return a rejection reason
  if (restrictionAge.gt) {
    if (redeemAge < restrictionAge.gt) {
      return createReasonError("age", "isNotGT");
    }
  }
  if (restrictionAge.lt) {
    if (redeemAge > restrictionAge.lt) {
      return createReasonError("age", "isNotLT");
    }
  }
  if (restrictionAge.eq) {
    if (redeemAge !== restrictionAge.eq) {
      return createReasonError("age", "isNotEq");
    }
  }

  return reason;
}
