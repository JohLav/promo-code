export const weatherService = {
  getWeather(town) {
    const cityWeather = {
      Lyon: "clouds",
      Marseille: "clear",
      Paris: "rain",
    };
    return cityWeather[town] || "clear";
  },
  getTemperature(town) {
    const cityTemp = {
      Lyon: 10,
      Marseille: 18,
      Paris: 7,
    };
    return cityTemp[town] || 10;
  },
};
