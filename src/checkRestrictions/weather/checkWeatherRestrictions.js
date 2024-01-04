module.exports = { checkWeatherRestrictions };
const { createReasonError } = require("../../utils/createReasonError");
const { extractWeatherInfo } = require("./fetchWeatherData");

/**
 *
 * @param restrictionWeather
 * @param weatherData
 * @returns {{isOK: boolean}|{nameError, messageError, isOR: boolean}}
 */
function checkWeatherRestrictions(restrictionWeather, weatherData) {
  // Initialise output variable
  let reason = { isOK: true };

  const weatherInfo = extractWeatherInfo(weatherData);

  // If the PromoCode contains weather restrictions and
  // the user does not meet them, return a rejection reason
  if (restrictionWeather.is) {
    if (weatherInfo.weatherType !== restrictionWeather.is) {
      return createReasonError("weather", "isNotClear");
    }
  }
  if (restrictionWeather.temp) {
    if (restrictionWeather.temp.lt) {
      if (weatherInfo.weatherTempInCelsius > restrictionWeather.temp.lt) {
        return createReasonError("weather", "isNotLT");
      }
    }
    if (restrictionWeather.temp.gt) {
      if (weatherInfo.weatherTempInCelsius < restrictionWeather.temp.gt) {
        return createReasonError("weather", "isNotGT");
      }
    }
  }

  return reason;
}
