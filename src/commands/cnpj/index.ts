import { CommandStructure } from "../../shared/utils/command-structure";
import { generateCnpj } from "./utils";

export const cnpjCommand: CommandStructure = {
  name: "cnpj",
  description: "Gera um CNPJ fictício válido.",
  action: (options: { amount?: number }) => {
    const generatedCnpjs = Array.from(
      { length: options.amount ?? 1 },
      generateCnpj
    );

    generatedCnpjs.forEach((generatedCnpj, index) => {
      console.log(
        `CNPJ ${index + 1}) Com Máscara: ${
          generatedCnpj.withMask
        } - Sem Máscara: ${generatedCnpj.withoutMask}`
      );
    });
  },
};
