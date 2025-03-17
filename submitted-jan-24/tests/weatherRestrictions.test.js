const { askReduction } = require("../src/askReduction.js");
const {
  fetchWeatherData,
  extractWeatherInfo,
} = require("../src/checkRestrictions/weather/fetchWeatherData");

describe("Weather-related promo code validation", () => {
  // 'accepted' PromoCodes
  it("should return acceptance of a simple promo code with valid 'is' weather", async () => {
    const weatherData = await fetchWeatherData("Lyon");
    const weatherInfo = extractWeatherInfo(weatherData);

    const promoCode = {
      name: "SimpleCodeWeatherIs",
      advantage: { percent: 35 },
      restrictions: {
        "@weather": {
          is: `${weatherInfo.weatherType}`,
          temp: {
            lt: `${weatherInfo.weatherTempInCelsius}`,
          },
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeWeatherIs",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeWeatherIs",
      status: "accepted",
      advantage: { percent: 35 },
    });
  });
  it("should return acceptance of a simple promo code with valid 'greater than temp' weather", async () => {
    const weatherData = await fetchWeatherData("Lyon");
    const weatherInfo = extractWeatherInfo(weatherData);

    const promoCode = {
      name: "SimpleCodeWeatherGTTemp",
      advantage: { percent: 35 },
      restrictions: {
        "@weather": {
          temp: {
            gt: `${weatherInfo.weatherTempInCelsius}`,
          },
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeWeatherGTTemp",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeWeatherGTTemp",
      status: "accepted",
      advantage: { percent: 35 },
    });
  });
  it("should return acceptance of a simple promo code with valid 'lesser than temp' weather", async () => {
    const weatherData = await fetchWeatherData("Lyon");
    const weatherInfo = extractWeatherInfo(weatherData);

    const promoCode = {
      name: "SimpleCodeWeatherLTTemp",
      advantage: { percent: 35 },
      restrictions: {
        "@weather": {
          temp: {
            lt: `${weatherInfo.weatherTempInCelsius}`, // Celsius here.
          },
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeWeatherLTTemp",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeWeatherLTTemp",
      status: "accepted",
      advantage: { percent: 35 },
    });
  });

  // 'denied' PromoCodes
  it("should return rejection of a simple promo code with invalid 'is' weather", async () => {
    const weatherData = await fetchWeatherData("Lyon");
    const weatherInfo = extractWeatherInfo(weatherData);

    const promoCode = {
      name: "InvalidSimpleCodeWeatherIs",
      advantage: { percent: 20 },
      restrictions: {
        "@weather": {
          is: `${!weatherInfo.weatherType}`,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeWeatherIs",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeWeatherIs",
      status: "denied",
      reasons: {
        weather: "isNotClear",
      },
    });
  });
  it("should return rejection of a simple promo code with invalid 'greater than temp' weather", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeWeatherGTTemp",
      advantage: { percent: 20 },
      restrictions: {
        "@weather": {
          temp: {
            gt: "300", // Celsius here.
          },
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeWeatherGTTemp",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeWeatherGTTemp",
      status: "denied",
      reasons: {
        weather: "isNotGT",
      },
    });
  });
  it("should return rejection of a simple promo code with invalid 'lesser than temp' weather", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeWeatherLTTemp",
      advantage: { percent: 20 },
      restrictions: {
        "@weather": {
          temp: {
            lt: "0",
          },
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeWeatherLTTemp",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeWeatherLTTemp",
      status: "denied",
      reasons: {
        weather: "isNotLT",
      },
    });
  });
});
