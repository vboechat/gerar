import { Command } from "commander";
import { buildCommand } from "../../shared/utils/command-builder";
import { generateCpf } from "./utils";
import { CommandOptions } from "../../shared/utils/command-options";
import { logResult } from "../../shared/utils/result-logger";

export const registerCpfCommand = (program: Command) => {
  return buildCommand(program, {
    name: "cpf",
    description: "Gera um CPF fictício válido.",
    action: (options: CommandOptions) => {
      const generatedCpfs = Array.from(
        { length: options.amount ?? 1 },
        generateCpf
      );

      generatedCpfs.forEach((generatedCpf, index) => {
        logResult({
          label: "CPF",
          index,
          showIndex: true,
          result: generatedCpf,
          options,
        });
      });
    },
  });
};
