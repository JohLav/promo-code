const { askReduction } = require("../src/askReduction.js");

describe("Date-related promo code validation", () => {
  // 'accepted' Promo Codes
  it("should return acceptance of a simple promo code with valid date range", async () => {
    const promoCode = {
      name: "SimpleCodeDateRange",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          after: "2021-01-01",
          before: "2022-01-01",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "SimpleCodeDateRange",
      arguments: {
        date: "2021-11-11",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeDateRange",
      status: "accepted",
      advantage: { percent: 15 },
    });
  });
  it("should return acceptance of a simple promo code with valid 'after' date", async () => {
    const promoCode = {
      name: "SimpleCodeAfterDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          after: "2021-01-01",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "SimpleCodeAfterDate",
      arguments: {
        date: "2025-04-03",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeAfterDate",
      status: "accepted",
      advantage: { percent: 15 },
    });
  });
  it("should return acceptance of a simple promo code with valid 'before' date", async () => {
    const promoCode = {
      name: "SimpleCodeBeforeDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          before: "2025-04-03",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "SimpleCodeBeforeDate",
      arguments: {
        date: "2021-01-01",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeBeforeDate",
      status: "accepted",
      advantage: { percent: 15 },
    });
  });
  it("should return acceptance of a simple promo code with valid equal date", async () => {
    const promoCode = {
      name: "SimpleCodeEqDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          eq: "2024-01-03",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "SimpleCodeEqDate",
      arguments: {
        date: "2024-01-03",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "SimpleCodeEqDate",
      status: "accepted",
      advantage: { percent: 15 },
    });
  });

  // //   //    'denied' Promo Codes
  it("should return rejection of a simple promo code with invalid 'after' date", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeAfterDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          after: "2021-01-01",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeAfterDate",
      arguments: {
        date: "2020-07-07",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeAfterDate",
      status: "denied",
      reasons: {
        date: "isNotAfter",
      },
    });
  });
  it("should return rejection of a simple promo code with invalid 'before' date", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeBeforeDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          before: "2022-01-01",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeBeforeDate",
      arguments: {
        date: "2023-11-11",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeBeforeDate",
      status: "denied",
      reasons: {
        date: "isNotBefore",
      },
    });
  });
  it("should return rejection of a simple promo code with invalid equal date", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeEqDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          eq: "2024-01-01",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeEqDate",
      arguments: {
        date: "2024-04-04",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeEqDate",
      status: "denied",
      reasons: {
        date: "isNotEq",
      },
    });
  });
  it("should return rejection of a simple promo code without date", async () => {
    const promoCode = {
      name: "InvalidSimpleCodeWithoutDate",
      advantage: { percent: 15 },
      restrictions: {
        "@date": {
          eq: "2024-01-01",
        },
      },
    };

    const redeemInfo = {
      promocode_name: "InvalidSimpleCodeWithoutDate",
      arguments: {
        date: "",
      },
    };

    const received = await askReduction(redeemInfo, promoCode);

    expect(received).toEqual({
      promocode_name: "InvalidSimpleCodeWithoutDate",
      status: "denied",
      reasons: {
        date: "isNotEq",
      },
    });
  });
});
