module.exports = { checkRestrictions };
const { checkAgeRestrictions } = require("./age/checkAgeRestrictions");
const { checkDateRestrictions } = require("./date/checkDateRestrictions");
const {
  checkWeatherRestrictions,
} = require("./weather/checkWeatherRestrictions");
const { checkOrRestrictions } = require("./checkOrRestrictions");

/**
 *
 * @param redeemArguments
 * @param restrictions
 * @param weatherData
 * @returns {{isOK: boolean}|*|{isOK: boolean}}
 */
function checkRestrictions(redeemArguments, restrictions, weatherData) {
  // Initialise output variable
  let reason = { isOK: true };

  const restrictionsTypeList = Object.keys(restrictions);

  // For all types of restrictions, check if values in redeemInfo are equal to PromoCode restrictions
  for (let index = 0; index < restrictionsTypeList.length; index++) {
    const restrictionType = restrictionsTypeList[index];

    switch (restrictionType) {
      case "@or":
        reason = checkOrRestrictions(
          redeemArguments,
          restrictions,
          weatherData,
        );
        break;
      case "@age":
        reason = checkAgeRestrictions(
          redeemArguments.age,
          restrictions[restrictionType],
        );
        if (reason.isOK === false) {
          return reason;
        }
        break;
      case "@date":
        reason = checkDateRestrictions(
          redeemArguments.date,
          restrictions[restrictionType],
        );
        if (reason.isOK === false) {
          return reason;
        }
        break;
      case "@weather":
        reason = checkWeatherRestrictions(
          restrictions[restrictionType],
          weatherData,
        );
        if (reason.isOK === false) {
          return reason;
        }
        break;
      default:
        console.error(`Unsupported restriction type: ${restrictionType}`);
    }
  }

  return reason;
}
