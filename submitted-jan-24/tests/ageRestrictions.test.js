const { askReduction } = require("../src/askReduction.js");

describe("Age-related simple promo code validation", () => {
  // 'accepted' PromoCodes
  it("should return acceptance of a simple promo code with valid age range", async () => {
    const promoCode = {
      name: "SimpleCodeAgeRange",
      advantage: { percent: 25 },
      restrictions: {
        "@age": {
          gt: 10,
          lt: 20,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeAgeRange",
      arguments: {
        age: 15,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeRange",
      status: "accepted",
      advantage: { percent: 25 },
    });
  });
  it("should return acceptance of a simple promo code with valid 'greater than' age", async () => {
    const promoCode = {
      name: "SimpleCodeAgeGT",
      advantage: { percent: 50 },
      restrictions: {
        "@age": {
          gt: 60,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeAgeGT",
      arguments: {
        age: 65,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeGT",
      status: "accepted",
      advantage: { percent: 50 },
    });
  });
  it("should return acceptance of a simple promo code with valid 'lesser than' age", async () => {
    const promoCode = {
      name: "SimpleCodeAgeLT",
      advantage: { percent: 20 },
      restrictions: {
        "@age": {
          lt: 30,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeAgeLT",
      arguments: {
        age: 20,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeLT",
      status: "accepted",
      advantage: { percent: 20 },
    });
  });
  it("should return acceptance of a simple promo code with valid equal age", async () => {
    const promoCode = {
      name: "SimpleCodeAgeEq",
      advantage: { percent: 20 },
      restrictions: {
        "@age": {
          eq: 40,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "SimpleCodeAgeEq",
      arguments: {
        age: 40,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeAgeEq",
      advantage: { percent: 20 },
      status: "accepted",
    });
  });

  // 'denied' PromoCodes
  it("should return rejection of a simple promo code with invalid 'greater than' age", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeAgeGT",
      advantage: { percent: 50 },
      restrictions: {
        "@age": {
          gt: 60,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeAgeGT",
      arguments: {
        age: 55,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeAgeGT",
      status: "denied",
      reasons: {
        age: "isNotGT",
      },
    });
  });
  it("should return rejection of a simple promo code with invalid 'lesser than' age", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeAgeLT",
      advantage: { percent: 20 },
      restrictions: {
        "@age": {
          lt: 20,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeAgeLT",
      arguments: {
        age: 55,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeAgeLT",
      status: "denied",
      reasons: {
        age: "isNotLT",
      },
    });
  });
  it("should return rejection of a simple promo code with invalid equal age", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeAgeEq",
      advantage: { percent: 20 },
      restrictions: {
        "@age": {
          eq: 18,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeAgeEq",
      arguments: {
        age: 19,
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeAgeEq",
      status: "denied",
      reasons: {
        age: "isNotEq",
      },
    });
  });
  it("should return rejection of a simple promo code without age", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeAge",
      advantage: { percent: 20 },
      restrictions: {
        "@age": {
          eq: 25,
        },
      },
    };
    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeAge",
      arguments: {
        age: "",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeAge",
      status: "denied",
      reasons: {
        age: "isNotEq",
      },
    });
  });
});
