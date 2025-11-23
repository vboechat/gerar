type GenerateCnpjResponse = {
  withMask: string;
  withoutMask: string;
};

export const calculateCnpjDigit = (cnpj: string): number => {
  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const length = cnpj.length;
  const relevantWeights = weights.slice(weights.length - length);

  const sum = cnpj
    .split("")
    .reduce((acc, num, index) => acc + Number(num) * relevantWeights[index], 0);

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCnpj = (): GenerateCnpjResponse => {
  const baseCnpj = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const firstDigit = calculateCnpjDigit(baseCnpj);
  const lastDigit = calculateCnpjDigit(baseCnpj + firstDigit);

  const fullCnpj = baseCnpj + firstDigit.toString() + lastDigit.toString();

  return {
    // TODO: Improve this as soon as possible.
    withMask: `${fullCnpj.slice(0, 2)}.${fullCnpj.slice(2, 5)}.${fullCnpj.slice(
      5,
      8
    )}/${fullCnpj.slice(8, 12)}-${fullCnpj.slice(12, 14)}`,
    withoutMask: fullCnpj,
  };
};
