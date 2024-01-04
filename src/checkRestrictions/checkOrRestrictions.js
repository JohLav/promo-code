module.exports = { checkOrRestrictions };
const { checkRestrictions } = require("./checkRestrictions");

/**
 *
 * @param redeemArguments
 * @param restrictions
 * @param weatherData
 * @returns {{isOK: boolean}|{isOK: boolean}|*}
 */
function checkOrRestrictions(redeemArguments, restrictions, weatherData) {
  // Initialise output variable
  let reason = { isOK: true };

  const listRestrictions = restrictions["@or"];

  for (let i = 0; i < listRestrictions.length; i++) {
    const restrictionChild = listRestrictions[i];
    reason = checkRestrictions(redeemArguments, restrictionChild, weatherData);

    if (reason.isOK === true) {
      break;
    } else if (listRestrictions.length - 1 === i) {
      return reason;
    }
  }

  return reason;
}
