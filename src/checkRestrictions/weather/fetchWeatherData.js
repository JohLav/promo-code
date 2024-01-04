const axios = require("axios");
module.exports = { fetchWeatherData, extractWeatherInfo };

/**
 *
 * @param redeemTown
 * @returns {Promise<any>}
 */
async function fetchWeatherData(redeemTown) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${redeemTown}&appid=${apiKey}`;

  const weatherData = await axios.get(url);

  return weatherData.data;
}

/**
 *
 * @param tempInFahrenheit
 * @returns {string}
 */
function convertTemperatureToCelsius(tempInFahrenheit) {
  return ((tempInFahrenheit - 32) * (5 / 9)).toFixed(2);
}

/**
 *
 * @param weatherData
 * @returns {{weatherType: string, weatherTempInCelsius: string}}
 */
function extractWeatherInfo(weatherData) {
  const weatherType = weatherData["weather"][0]["main"].toLowerCase();
  const weatherTempInFahrenheit = weatherData["main"]["temp"];
  const weatherTempInCelsius = convertTemperatureToCelsius(
    weatherTempInFahrenheit,
  );
  return { weatherType, weatherTempInCelsius };
}
