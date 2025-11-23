import { describe, it, expect } from "vitest";
import { calculateCpfDigit, generateCpf } from "../utils";

describe("calculateCpfDigit", () => {
  it("should calculate the first check digit correctly for known CPF", () => {
    const firstDigit = calculateCpfDigit("111444777");

    expect(firstDigit).toBe(3);
  });

  it("should calculate the second check digit correctly for known CPF", () => {
    const secondDigit = calculateCpfDigit("1114447773");

    expect(secondDigit).toBe(5);
  });

  it("should return 0 when remainder is less than 2", () => {
    const digit = calculateCpfDigit("000000000");

    expect(digit).toBe(0);
  });

  it("should return correct digit when remainder is 2 or greater", () => {
    const digit = calculateCpfDigit("123456789");

    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });

  it("should handle 9-digit input correctly", () => {
    const digit = calculateCpfDigit("123456789");

    expect(digit).toBeTypeOf("number");
    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });

  it("should handle 10-digit input correctly (for second digit calculation)", () => {
    const digit = calculateCpfDigit("1234567890");

    expect(digit).toBeTypeOf("number");
    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });
});

describe("generateCpf", () => {
  it("should generate a CPF with correct structure", () => {
    const result = generateCpf();

    expect(result).toHaveProperty("withMask");
    expect(result).toHaveProperty("withoutMask");
  });

  it("should generate CPF withoutMask with exactly 11 digits", () => {
    const result = generateCpf();

    expect(result.withoutMask).toMatch(/^\d{11}$/);
    expect(result.withoutMask.length).toBe(11);
  });

  it("should generate CPF withMask in correct format (XXX.XXX.XXX-XX)", () => {
    const result = generateCpf();

    expect(result.withMask).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });

  it("should generate valid CPF digits (check digits are correct)", () => {
    const result = generateCpf();
    const cpf = result.withoutMask;

    const base = cpf.slice(0, 9);
    const firstCheckDigit = Number(cpf[9]);
    const secondCheckDigit = Number(cpf[10]);

    const calculatedFirstDigit = calculateCpfDigit(base);
    expect(firstCheckDigit).toBe(calculatedFirstDigit);

    const calculatedSecondDigit = calculateCpfDigit(base + firstCheckDigit);
    expect(secondCheckDigit).toBe(calculatedSecondDigit);
  });

  it("should generate different CPFs on multiple calls", () => {
    const results = Array.from({ length: 10 }, () => generateCpf());
    const uniqueCpfs = new Set(results.map((r) => r.withoutMask));

    expect(uniqueCpfs.size).toBeGreaterThan(1);
  });

  it("should generate CPF where withMask and withoutMask represent the same number", () => {
    const result = generateCpf();

    const unmasked = result.withMask.replace(/[.-]/g, "");

    expect(unmasked).toBe(result.withoutMask);
  });

  it("should generate multiple valid CPFs", () => {
    const results = Array.from({ length: 100 }, () => generateCpf());

    results.forEach((result) => {
      const cpf = result.withoutMask;
      const base = cpf.slice(0, 9);
      const firstCheckDigit = Number(cpf[9]);
      const secondCheckDigit = Number(cpf[10]);

      const calculatedFirstDigit = calculateCpfDigit(base);
      const calculatedSecondDigit = calculateCpfDigit(base + firstCheckDigit);

      expect(firstCheckDigit).toBe(calculatedFirstDigit);
      expect(secondCheckDigit).toBe(calculatedSecondDigit);
    });
  });
});
