type CommandBaseOptionsObject = {
  flag: string;
  description: string;
  validator?: (value: string) => any;
};

export const commandBaseOptions = {
  amount: {
    flag: "-a, --amount <amount>",
    description: "Quantidade a ser gerado.",
    validator: (value: string) => Number(value),
  },
  masked: {
    flag: "-m, --masked",
    description: "Gera o resultado com máscara.",
  },
  unmasked: {
    flag: "-u, --unmasked",
    description: "Gera o resultado sem máscara.",
  },
  copy: {
    flag: "-c, --copy",
    description: "Copia o resultado para a área de transferência.",
  },
} as const satisfies Record<string, CommandBaseOptionsObject>;

export type CommandBaseOptions = keyof typeof commandBaseOptions;
export type CommandOptions = Partial<{
  [Option in CommandBaseOptions]: (typeof commandBaseOptions)[Option] extends {
    validator: (value: string) => infer ValidatorReturnType;
  }
    ? ValidatorReturnType
    : boolean;
}>;
