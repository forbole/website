import { formatCoin } from "../formatters";

describe("formatCoin", () => {
  it("returns the expected values", () => {
    expect(formatCoin({ amount: "1", denom: "uatom" })).toBe("0.000001 ATOM");
    expect(formatCoin({ amount: "1000000", denom: "uatom" })).toBe("1.00 ATOM");
    expect(formatCoin({ amount: "0", denom: "uatom" })).toBe("0.00 ATOM");
    expect(formatCoin({ amount: "10", denom: "atom" })).toBe("10.00 ATOM");
  });
});
