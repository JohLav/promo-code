import ReductionCalculator from "../src";
import { weatherService } from "../src/weatherService.js";

describe("promo code validation application", () => {
  it("should accept a complex valid promo code", async () => {
    const promoCodeDetails = {
      name: "WeatherCodeAgeComplex",
      avantage: { percent: 20 },
      restrictions: {
        "@or": [
          {
            age: {
              eq: 40,
            },
          },
          {
            age: {
              lt: 30,
              gt: 15,
            },
          },
        ],
        date: {
          after: "2021-01-01",
          before: "2022-01-01",
        },
        weather: {
          is: "clear",
          temp: {
            lt: "100", // Celsius here.
          },
        },
      },
    };

    const recoveredInfo = {
      promocode_name: "WeatherCodeAgeComplex",
      arguments: {
        age: 16,
        weather: { town: "Marseille" },
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherService,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "WeatherCodeAgeComplex",
      avantage: { percent: 20 },
      status: "accepted",
    });
  });

  it("should reject a complex invalid promo code", async () => {
    const promoCodeDetails = {
      name: "WeatherCodeAgeComplex",
      avantage: { percent: 20 },
      restrictions: {
        or: [
          {
            age: {
              eq: 40,
            },
          },
          {
            age: {
              lt: 30,
              gt: 15,
            },
          },
        ],
        date: {
          after: "2021-01-01",
          before: "2022-01-01",
        },
        weather: {
          is: "clear",
          temp: {
            lt: "100", // Celsius here.
          },
        },
      },
    };

    const recoveredInfo = {
      promocode_name: "WeatherCodeAgeComplex",
      arguments: {
        age: 32,
        weather: { town: "Marseille" },
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherService,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "WeatherCodeAgeComplex",
      reasons: {
        age: ["isNotEq", "isNotLt"],
      },
      status: "denied",
    });
  });
});
