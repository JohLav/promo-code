import ReductionCalculator from "../src/index.js";

describe("promo code age validation application", () => {
  it("should accept a simple promo code within an age range", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeAgeRange",
      avantage: { percent: 25 },
      restrictions: {
        age: {
          gt: 10,
          lt: 20,
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeAgeRange",
      arguments: {
        age: 15,
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeRange",
      avantage: { percent: 25 },
      status: "accepted",
    });
  });

  it("should accept a simple promo code that is equal to an age", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeEqAge",
      avantage: { percent: 20 },
      restrictions: {
        age: {
          eq: 40,
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeEqAge",
      arguments: {
        age: 40,
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeEqAge",
      avantage: { percent: 20 },
      status: "accepted",
    });
  });

  it("should reject a simple promo code that is not greater than a minimum age range", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeAgeNotGt",
      avantage: { percent: 20 },
      restrictions: {
        age: {
          gt: 21,
          lt: 30,
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeAgeNotGt",
      arguments: {
        age: 19,
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeNotGt",
      reasons: {
        age: "isNotGt",
      },
      status: "denied",
    });
  });

  it("should reject a simple promo code that is not lesser than a maximum age range", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeAgeNotLt",
      avantage: { percent: 20 },
      restrictions: {
        age: {
          gt: 21,
          lt: 30,
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeAgeNotLt",
      arguments: {
        age: 33,
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeNotLt",
      reasons: {
        age: "isNotLt",
      },
      status: "denied",
    });
  });

  it("should reject a simple promo code that is not equal to an age", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeNotEqAge",
      avantage: { percent: 50 },
      restrictions: {
        age: {
          eq: 28,
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeNotEqAge",
      arguments: {
        age: 36,
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeNotEqAge",
      reasons: {
        age: "isNotEq",
      },
      status: "denied",
    });
  });
});
