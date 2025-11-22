type GenerateCpfResponse = {
  withMask: string;
  withoutMask: string;
};

export const calculateCpfDigit = (cpf: string): number => {
  const length = cpf.length + 1;
  const sum = cpf
    .split("")
    .reduce((acc, num, index) => acc + Number(num) * (length - index), 0);

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCpf = (): GenerateCpfResponse => {
  const baseCpf = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const firstDigit = calculateCpfDigit(baseCpf);
  const lastDigit = calculateCpfDigit(baseCpf + firstDigit);

  const fullCpf = baseCpf + firstDigit.toString() + lastDigit.toString();

  return {
    // TODO: Improve this as soon as possible.
    withMask: `${fullCpf.slice(0, 3)}.${fullCpf.slice(3, 6)}.${fullCpf.slice(
      6,
      9
    )}-${fullCpf.slice(9, 11)}`,
    withoutMask: fullCpf,
  };
};
