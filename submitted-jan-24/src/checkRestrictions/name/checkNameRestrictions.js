module.exports = { checkNameRestrictions };
const { createReasonError } = require("../../utils/createReasonError");

/**
 * Function to check name restrictions against the provided redeemName.
 *
 * @param redeemName - The redeemName, typically from a promo code.
 * @param restrictionName - The specified name restriction from the promo code.
 * @returns {{isOK: boolean}} - Object indicating whether name restrictions are met or not.
 */
function checkNameRestrictions(redeemName, restrictionName) {
  // Initialise output variable
  let reason = { isOK: true };

  // If the provided name is not equal to the specified name restriction
  if (redeemName.promocode_name !== restrictionName.name) {
    createReasonError("name", "isIncorrect");
  }

  // Return the result indicating that name restrictions are met
  return reason;
}
