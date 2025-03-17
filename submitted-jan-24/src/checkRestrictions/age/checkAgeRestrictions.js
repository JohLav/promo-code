module.exports = { checkAgeRestrictions };
const { createReasonError } = require("../../utils/createReasonError");

/**
 * Function to check age restrictions against the provided redeemAge.
 *
 * @param redeemAge - The redemption age, typically from a promo code.
 * @param restrictionAge - The specified age restrictions from the promo code.
 * @returns {{isOK: boolean}|{nameError, messageError, isOR: boolean}} - Object indicating whether age restrictions are met or not, along with a reason if not.
 */
function checkAgeRestrictions(redeemAge, restrictionAge) {
  // Initialise output variable
  let reason = { isOK: true };

  // Check if the redeemAge meets the specified age restrictions
  if (restrictionAge.gt) {
    // If the redeemAge is not greater than the specified age, return a rejection reason
    if (redeemAge < restrictionAge.gt) {
      return createReasonError("age", "isNotGT");
    }
  }
  if (restrictionAge.lt) {
    // If the redeemAge is not less than the specified age, return a rejection reason
    if (redeemAge > restrictionAge.lt) {
      return createReasonError("age", "isNotLT");
    }
  }
  if (restrictionAge.eq) {
    // If the redeemAge is not equal to the specified age, return a rejection reason
    if (redeemAge !== restrictionAge.eq) {
      return createReasonError("age", "isNotEq");
    }
  }

  // Return the result indicating that age restrictions are met
  return reason;
}
