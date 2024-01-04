module.exports = { checkDateRestrictions };
const { isAfter, isBefore, isEqual } = require("date-fns");
const { createReasonError } = require("../../utils/createReasonError");

/**
 * Function to check date restrictions against the provided redeemDate.
 *
 * @param redeemDate - The redeemDate, typically from a promo code.
 * @param restrictionDate - The specified date restrictions from the promo code.
 * @returns {{isOK: boolean}|{nameError, messageError, isOR: boolean}} - Object indicating whether date restrictions are met or not, along with a reason if not.
 */
function checkDateRestrictions(redeemDate, restrictionDate) {
  // Initialise output variable
  let reason = { isOK: true };

  // If the promo code does not contain date restrictions, end here
  if (redeemDate === undefined) {
    return reason;
  }

  // Check if the redeemDate meets the specified date restrictions
  if (restrictionDate.after) {
    // If the redeemDate is not after the specified date, return a rejection reason
    if (!isAfter(redeemDate, restrictionDate.after)) {
      return createReasonError("date", "isNotAfter");
    }
  }
  if (restrictionDate.before) {
    // If the redeemDate is not before the specified date, return a rejection reason
    if (!isBefore(redeemDate, restrictionDate.before)) {
      return createReasonError("date", "isNotBefore");
    }
  }
  if (restrictionDate.eq) {
    // If the redeemDate is not equal to the specified date, return a rejection reason
    if (!isEqual(redeemDate, restrictionDate.eq)) {
      return createReasonError("date", "isNotEq");
    }
  }

  // Return the result indicating that date restrictions are met
  return reason;
}
