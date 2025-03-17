import ReductionCalculator from "../src/index.js";

describe("promo code date validation application", () => {
  it("should accept a simple promo code within a date range", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeValidDate",
      avantage: { percent: 30 },
      restrictions: {
        date: {
          after: "2025-01-01",
          before: "2026-01-01",
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeValidDate",
      arguments: {
        date: "2025-01-14",
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeValidDate",
      avantage: { percent: 30 },
      status: "accepted",
    });
  });

  it("should reject a simple promo code that is not after the minimum date range", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeInvalidDate",
      avantage: { percent: 30 },
      restrictions: {
        date: {
          after: "2025-01-01",
          before: "2026-01-01",
        },
      },
    };

    const recoveredInfo = {
      promocode_name: "SimpleCodeInvalidDate",
      arguments: {
        date: "2024-12-24",
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeInvalidDate",
      reasons: {
        date: "isNotAfter",
      },
      status: "denied",
    });
  });

  it("should reject a simple promo code that is not before the maximum date range", async () => {
    const promoCodeDetails = {
      name: "SimpleCodeInvalidDate",
      avantage: { percent: 30 },
      restrictions: {
        date: {
          after: "2025-01-01",
          before: "2026-01-01",
        },
      },
    };
    const recoveredInfo = {
      promocode_name: "SimpleCodeInvalidDate",
      arguments: {
        date: "2026-01-02",
      },
    };

    const received = await new ReductionCalculator(
      recoveredInfo,
      promoCodeDetails,
    ).askReduction();

    expect(received).toEqual({
      promocode_name: "SimpleCodeInvalidDate",
      reasons: {
        date: "isNotBefore",
      },
      status: "denied",
    });
  });
});
