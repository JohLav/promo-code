const { askReduction } = require("../src/askReduction");
const {
  fetchWeatherData,
  extractWeatherInfo,
} = require("../src/checkRestrictions/weather/fetchWeatherData");

describe("Complex promo code validation", () => {
  // 'accepted' PromoCodes
  it("should return acceptance of a valid complex promo code", async () => {
    const weatherData = await fetchWeatherData("Lyon");
    const weatherInfo = extractWeatherInfo(weatherData);

    const promoCode = {
      name: "ComplexCode",
      advantage: { percent: 20 },
      restrictions: {
        "@or": [
          {
            "@age": {
              eq: 40,
            },
          },
          {
            "@age": {
              gt: 15,
              lt: 30,
            },
          },
        ],
        "@date": {
          after: "2024-01-04",
          before: "2024-12-31",
        },
        "@weather": {
          is: `${weatherInfo.weatherType}`,
          temp: {
            lt: `${weatherInfo.weatherTempInCelsius}`,
          },
        },
      },
    };

    const redeemInfo = {
      promocode_name: "ComplexCode",
      arguments: {
        age: 16,
        date: "2024-07-07",
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "ComplexCode",
      status: "accepted",
      advantage: { percent: 20 },
    });
  });

  // 'denied' PromoCodes
  it("should return rejection of an invalid complex promo code", async () => {
    const promoCode = {
      name: "InvalidComplexCode",
      advantage: { percent: 20 },
      restrictions: {
        "@or": [
          {
            "@age": {
              eq: 40,
            },
          },
          {
            "@age": {
              gt: 15,
              lt: 30,
            },
          },
        ],
        "@date": {
          after: "2021-01-01",
          before: "2022-01-01",
        },
        "@weather": {
          is: "clear",
          temp: {
            lt: "100", // Celsius here.
          },
        },
      },
    };

    const redeemInfo = {
      promocode_name: "InvalidComplexCode",
      arguments: {
        age: 10,
        weather: { town: "Lyon" },
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidComplexCode",
      status: "denied",
      reasons: {
        weather: "isNotClear",
      },
    });
  });
});
