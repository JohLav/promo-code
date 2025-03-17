module.exports = { checkWeatherRestrictions };
const { createReasonError } = require("../../utils/createReasonError");
const { extractWeatherInfo } = require("./fetchWeatherData");

/**
 * Function to check weather restrictions against the current weather data.
 *
 * @param restrictionWeather - Weather restrictions specified in the promo code.
 * @param weatherData - Current weather data.
 * @returns {{isOK: boolean}|{nameError, messageError, isOR: boolean}} - Object indicating whether weather restrictions are met or not, along with a reason if not.
 */
function checkWeatherRestrictions(restrictionWeather, weatherData) {
  // Initialise output variable
  let reason = { isOK: true };

  // Extract relevant weather information from the current weather data
  const weatherInfo = extractWeatherInfo(weatherData);

  // Check if the promo code contains weather restrictions and the user does not meet them
  if (restrictionWeather.is) {
    if (weatherInfo.weatherType !== restrictionWeather.is) {
      // Return a rejection reason if the weather type does not match the specified restriction
      return createReasonError("weather", "isNotClear");
    }
  }
  if (restrictionWeather.temp) {
    // Check if the temperature is less than the specified value
    if (restrictionWeather.temp.lt) {
      if (weatherInfo.weatherTempInCelsius > restrictionWeather.temp.lt) {
        return createReasonError("weather", "isNotLT");
      }
    }
    // Check if the temperature is greater than the specified value
    if (restrictionWeather.temp.gt) {
      if (weatherInfo.weatherTempInCelsius < restrictionWeather.temp.gt) {
        return createReasonError("weather", "isNotGT");
      }
    }
  }

  // Check if the temperature is greater than the specified value
  return reason;
}
