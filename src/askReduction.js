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
 *
 * @param redeemInfo
 * @param promoCode
 * @returns {Promise<{promocode_name: *}>}
 */
async function askReduction(redeemInfo, promoCode) {
  let weatherData;
  if (redeemInfo.arguments.hasOwnProperty("weather")) {
    const redeemTown = redeemInfo.arguments.weather.town;
    weatherData = await fetchWeatherData(redeemTown);
  }

  // Bool: Do redeemInfo and promoCode have the same info?
  let reason = checkNameRestrictions(redeemInfo, promoCode);

  // If true, check restrictions validity
  if (reason.isOK) {
    reason = checkRestrictions(
      redeemInfo.arguments,
      promoCode.restrictions,
      weatherData,
    );
  }

  // Output accepted with advantage or denied with reason
  return exportResult(reason, promoCode);
}
