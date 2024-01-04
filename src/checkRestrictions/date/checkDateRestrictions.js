const { isAfter, isBefore, isEqual } = require("date-fns");
const { createReasonError } = require("../../utils/createReasonError");
module.exports = { checkDateRestrictions };

/**
 *
 * @param redeemDate
 * @param restrictionDate
 * @returns {{isOK: boolean}|{nameError, messageError, isOR: boolean}}
 */
function checkDateRestrictions(redeemDate, restrictionDate) {
  // Initialise output variable
  let reason = { isOK: true };

  // If the PromoCode does not contain date restrictions, end here
  if (redeemDate === undefined) {
    return reason;
  }
  // If the PromoCode contains date restrictions and
  // the user does not meet them, return a rejection reason
  if (restrictionDate.after) {
    if (!isAfter(redeemDate, restrictionDate.after)) {
      return createReasonError("date", "isNotAfter");
    }
  }
  if (restrictionDate.before) {
    if (!isBefore(redeemDate, restrictionDate.before)) {
      return createReasonError("date", "isNotBefore");
    }
  }
  if (restrictionDate.eq) {
    if (!isEqual(redeemDate, restrictionDate.eq)) {
      return createReasonError("date", "isNotEq");
    }
  }

  return reason;
}
