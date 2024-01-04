module.exports = { askReduction };
const {
  checkNameRestrictions,
} = require("./checkRestrictions/name/checkNameRestrictions");
const {
  fetchWeatherData,
} = require("./checkRestrictions/weather/fetchWeatherData");
const { checkRestrictions } = require("./checkRestrictions/checkRestrictions");
const { exportResult } = require("./utils/exportResult");

/**
 * Function to check if redeemInfo is eligible for a promotion based on name restrictions and other criteria
 *
 * @param redeemInfo - Information about the redeemInfo.
 * @param promoCode - Details of the promotion code being checked.
 * @returns {Promise<{promocode_name: *}>} - Object containing the promotion code name and additional details.
 */
async function askReduction(redeemInfo, promoCode) {
  // Retrieve asynchronous weather data for the town in redeemInfo
  let weatherData;
  if (redeemInfo.arguments.hasOwnProperty("weather")) {
    const redeemTown = redeemInfo.arguments.weather.town;
    weatherData = await fetchWeatherData(redeemTown);
  }

  // Check if redeemInfo and promoCode have the same name information
  let reason = checkNameRestrictions(redeemInfo, promoCode);

  // If the name information is the same, proceed to check other restrictions
  if (reason.isOK) {
    reason = checkRestrictions(
      redeemInfo.arguments,
      promoCode.restrictions,
      weatherData,
    );
  }

  // Output whether the redeemInfo is accepted with advantage or denied with a reason
  return exportResult(reason, promoCode);
}
