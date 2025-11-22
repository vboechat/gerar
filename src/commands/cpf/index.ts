import { CommandStructure } from "../../shared/utils/command-structure";
import { generateCpf } from "./utils";

export const cpfCommand: CommandStructure = {
  name: "cpf",
  description: "Gera um CPF fictício válido.",
  action: (options: { amount?: number }) => {
    const generatedCpfs = Array.from(
      { length: options.amount ?? 1 },
      generateCpf
    );

    generatedCpfs.forEach((generatedCpf, index) => {
      console.log(
        `CPF ${index + 1}) Com Máscara: ${
          generatedCpf.withMask
        } - Sem Máscara: ${generatedCpf.withoutMask}`
      );
    });
  },
};
