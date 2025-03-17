module.exports = { checkRestrictions };
const { checkAgeRestrictions } = require("./age/checkAgeRestrictions");
const { checkDateRestrictions } = require("./date/checkDateRestrictions");
const {
  checkWeatherRestrictions,
} = require("./weather/checkWeatherRestrictions");
const { checkOrRestrictions } = require("./checkOrRestrictions");

/**
 * Function to check if redeemInfo meets specified restrictions.
 *
 * @param redeemArguments - The redeemInfo information (e.g., age, date, etc.).
 * @param restrictions - The set of restrictions to check against.
 * @param weatherData - Additional data related to weather restrictions.
 * @returns {{isOK: boolean}|*|{isOK: boolean}} - Object indicating whether redemption is allowed and additional details if not.
 */
function checkRestrictions(redeemArguments, restrictions, weatherData) {
  // Initialise output variable
  let reason = { isOK: true };

  // Get the list of restriction types present in the restrictions object
  const restrictionsTypeList = Object.keys(restrictions);

  // Iterate through each type of restriction and perform the corresponding check
  for (let index = 0; index < restrictionsTypeList.length; index++) {
    const restrictionType = restrictionsTypeList[index];

    switch (restrictionType) {
      // If the restriction type is "@or", perform or restriction check
      case "@or":
        reason = checkOrRestrictions(
          redeemArguments,
          restrictions,
          weatherData,
        );
        break;
      case "@age":
        // If the restriction type is "@age", perform age restriction check
        reason = checkAgeRestrictions(
          redeemArguments.age,
          restrictions[restrictionType],
        );
        // If age restriction is not met, immediately return the reason
        if (reason.isOK === false) {
          return reason;
        }
        break;
      // If the restriction type is "@date", perform date restriction check
      case "@date":
        reason = checkDateRestrictions(
          redeemArguments.date,
          restrictions[restrictionType],
        );
        // If date restriction is not met, immediately return the reason
        if (reason.isOK === false) {
          return reason;
        }
        break;
      // If the restriction type is "@weather", perform weather restriction check
      case "@weather":
        reason = checkWeatherRestrictions(
          restrictions[restrictionType],
          weatherData,
        );
        // If weather restriction is not met, immediately return the reason
        if (reason.isOK === false) {
          return reason;
        }
        break;

      // Log an error if an unsupported restriction type is encountered
      default:
        console.error(`Unsupported restriction type: ${restrictionType}`);
    }
  }

  // Return the final result after checking all restrictions
  return reason;
}
