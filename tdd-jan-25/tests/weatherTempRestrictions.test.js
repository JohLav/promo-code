import ReductionCalculator from "../src/index.js";
import { weatherService } from "../src/weatherService.js";
import sinon from "sinon";

describe("promo code weather and temperature validation application", () => {
  // Weather is checks
  it("should accept a simple promo code for clear weather", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeClearWeather",
      avantage: { percent: 30 },
      restrictions: {
        weather: {
          is: "clear",
        },
      },
    };

    const recoveredInfo = {
      promocode_name: "SimpleCodeClearWeather",
      arguments: {
        weather: { town: "Marseille" },
      },
    };

    const weatherServiceStub = {
      getWeather(town) {},
    };
    sinon.stub(weatherServiceStub, "getWeather");
    weatherServiceStub.getWeather.returns("clear");

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherServiceStub,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeClearWeather",
      avantage: { percent: 30 },
      status: "accepted",
    });
  });

  it("should reject a simple promo code for unclear weather", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeUnclearWeather",
      avantage: { percent: 30 },
      restrictions: {
        weather: {
          is: "clear",
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeUnclearWeather",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherService,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeUnclearWeather",
      reasons: {
        weather: "isNotClear",
      },
      status: "denied",
    });
  });

  it("should reject a simple promo code for not cloudy weather", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeNotCloudyWeather",
      avantage: { percent: 30 },
      restrictions: {
        weather: {
          is: "clouds",
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeNotCloudyWeather",
      arguments: {
        weather: { town: "Paris" },
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherService,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeNotCloudyWeather",
      reasons: {
        weather: "isNotCloudy",
      },
      status: "denied",
    });
  });

  // Weather temperature checks
  it("should reject a simple promo code that is not greater than a minimum temperature", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeTempNotGt",
      avantage: { percent: 30 },
      restrictions: {
        weather: {
          temp: {
            gt: "15",
          },
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeTempNotGt",
      arguments: {
        weather: { town: "Lyon" },
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherService,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeTempNotGt",
      reasons: {
        weather: "isNotGt",
      },
      status: "denied",
    });
  });

  it("should reject a simple promo code that is not lesser than a minimum temperature", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeTempNotLt",
      avantage: { percent: 30 },
      restrictions: {
        weather: {
          temp: {
            lt: 4,
          },
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeTempNotLt",
      arguments: {
        weather: { town: "Paris" },
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
      weatherService,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeTempNotLt",
      reasons: {
        weather: "isNotLt",
      },
      status: "denied",
    });
  });
});
