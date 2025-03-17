module.exports = { checkOrRestrictions };
const { checkRestrictions } = require("./checkRestrictions");

/**
 *  Function to check '@or' restrictions.
 *  It iterates through a list of restrictions and returns the first one that is satisfied.
 *
 * @param redeemArguments - The redeemArguments information (e.g., age, date, etc.)
 * @param restrictions - The "@or" list of restrictions to check against.
 * @param weatherData - Additional data related to weather restrictions.
 * @returns {{isOK: boolean}|{isOK: boolean}|*} - Object indicating whether any of the "@or" restrictions are met, and additional details if not.
 */
function checkOrRestrictions(redeemArguments, restrictions, weatherData) {
  // Initialise output variable
  let reason = { isOK: true };

  // Get the list of '@or' restrictions
  const listRestrictions = restrictions["@or"];

  // Iterate through each '@or' restriction and check against redeemArguments
  for (let i = 0; i < listRestrictions.length; i++) {
    const restrictionChild = listRestrictions[i];

    // Check the current '@or' restriction using the main checkRestrictions function
    reason = checkRestrictions(redeemArguments, restrictionChild, weatherData);

    // If the current '@or' restriction is satisfied, break out of the loop
    if (reason.isOK === true) {
      break;
    }
    // If the last '@or' restriction is checked and not satisfied, return the reason
    else if (listRestrictions.length - 1 === i) {
      return reason;
    }
  }

  // Return the final result after checking all '@or' restrictions
  return reason;
}
