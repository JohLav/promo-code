module.exports = { fetchWeatherData, extractWeatherInfo };
const axios = require("axios");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/**
 * Function to fetch weather data for a specified town using OpenWeatherMap API.
 *
 * @param redeemTown - The town for which weather data is to be fetched.
 * @returns {Promise<any>} - Promise that resolves to the weather data.
 */
async function fetchWeatherData(redeemTown) {
  // Retrieve API key from environment variables
  const apiKey = process.env.API_KEY;
  // Construct the URL for OpenWeatherMap API using the town and API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${redeemTown}&appid=${apiKey}`;

  // Use axios to make an asynchronous GET request to the OpenWeatherMap API
  const weatherData = await axios.get(url);

  // Return the extracted data from the API response
  return weatherData.data;
}

/**
 * Function to convert temperature from Fahrenheit to Celsius.
 *
 * @param tempInFahrenheit - Temperature in Fahrenheit.
 * @returns {string} - Converted temperature in Celsius.
 */
function convertTemperatureToCelsius(tempInFahrenheit) {
  // Convert temperature to Celsius using the formula and round to 2 decimal places
  return ((tempInFahrenheit - 32) * (5 / 9)).toFixed(2);
}

/**
 * Function to extract relevant weather information from OpenWeatherMap API response.
 *
 * @param weatherData - The raw weather data obtained from the API.
 * @returns {{weatherType: string, weatherTempInCelsius: string}} - Object containing weather type and temperature in Celsius.
 */
function extractWeatherInfo(weatherData) {
  // Extract weather type, temperature in Fahrenheit, and convert it to Celsius
  const weatherType = weatherData["weather"][0]["main"].toLowerCase();
  const weatherTempInFahrenheit = weatherData["main"]["temp"];
  const weatherTempInCelsius = convertTemperatureToCelsius(
    weatherTempInFahrenheit,
  );
  // Return an object containing weather information
  return { weatherType, weatherTempInCelsius };
}
