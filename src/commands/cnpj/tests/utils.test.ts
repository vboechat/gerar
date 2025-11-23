import { describe, it, expect } from "vitest";
import { calculateCnpjDigit, generateCnpj } from "../utils";

describe("calculateCnpjDigit", () => {
  it("should calculate the first check digit correctly for known CNPJ", () => {
    const firstDigit = calculateCnpjDigit("112223330001");

    expect(firstDigit).toBe(8);
  });

  it("should calculate the second check digit correctly for known CNPJ", () => {
    const secondDigit = calculateCnpjDigit("1122233300018");

    expect(secondDigit).toBe(1);
  });

  it("should return 0 when remainder is less than 2", () => {
    const digit = calculateCnpjDigit("000000000000");

    expect(digit).toBe(0);
  });

  it("should return correct digit when remainder is 2 or greater", () => {
    const digit = calculateCnpjDigit("123456780001");

    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });

  it("should handle 12-digit input correctly", () => {
    const digit = calculateCnpjDigit("123456780001");

    expect(digit).toBeTypeOf("number");
    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });

  it("should handle 13-digit input correctly (for second digit calculation)", () => {
    const digit = calculateCnpjDigit("1234567800012");

    expect(digit).toBeTypeOf("number");
    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });
});

describe("generateCnpj", () => {
  it("should generate a CNPJ with correct structure", () => {
    const result = generateCnpj();

    expect(result).toHaveProperty("withMask");
    expect(result).toHaveProperty("withoutMask");
  });

  it("should generate CNPJ withoutMask with exactly 14 digits", () => {
    const result = generateCnpj();

    expect(result.withoutMask).toMatch(/^\d{14}$/);
    expect(result.withoutMask.length).toBe(14);
  });

  it("should generate CNPJ withMask in correct format (XX.XXX.XXX/XXXX-XX)", () => {
    const result = generateCnpj();

    expect(result.withMask).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
  });

  it("should generate valid CNPJ digits (check digits are correct)", () => {
    const result = generateCnpj();
    const cnpj = result.withoutMask;

    const base = cnpj.slice(0, 12);
    const firstCheckDigit = Number(cnpj[12]);
    const secondCheckDigit = Number(cnpj[13]);

    const calculatedFirstDigit = calculateCnpjDigit(base);
    expect(firstCheckDigit).toBe(calculatedFirstDigit);

    const calculatedSecondDigit = calculateCnpjDigit(base + firstCheckDigit);
    expect(secondCheckDigit).toBe(calculatedSecondDigit);
  });

  it("should generate different CNPJs on multiple calls", () => {
    const results = Array.from({ length: 10 }, () => generateCnpj());
    const uniqueCnpjs = new Set(results.map((r) => r.withoutMask));

    expect(uniqueCnpjs.size).toBeGreaterThan(1);
  });

  it("should generate CNPJ where withMask and withoutMask represent the same number", () => {
    const result = generateCnpj();

    const unmasked = result.withMask.replace(/[.\/-]/g, "");

    expect(unmasked).toBe(result.withoutMask);
  });

  it("should generate multiple valid CNPJs", () => {
    const results = Array.from({ length: 100 }, () => generateCnpj());

    results.forEach((result) => {
      const cnpj = result.withoutMask;
      const base = cnpj.slice(0, 12);
      const firstCheckDigit = Number(cnpj[12]);
      const secondCheckDigit = Number(cnpj[13]);

      const calculatedFirstDigit = calculateCnpjDigit(base);
      const calculatedSecondDigit = calculateCnpjDigit(base + firstCheckDigit);

      expect(firstCheckDigit).toBe(calculatedFirstDigit);
      expect(secondCheckDigit).toBe(calculatedSecondDigit);
    });
  });
});
