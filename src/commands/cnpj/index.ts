import { Command } from "commander";
import { buildCommand } from "../../shared/utils/command-builder";
import { generateCnpj } from "./utils";
import { CommandOptions } from "../../shared/utils/command-options";
import { logResult } from "../../shared/utils/result-logger";

export const registerCnpjCommand = (program: Command) => {
  return buildCommand(program, {
    name: "cnpj",
    description: "Gera um CNPJ fictício válido.",
    action: (options: CommandOptions) => {
      const generatedCnpjs = Array.from(
        { length: options.amount ?? 1 },
        generateCnpj
      );

      generatedCnpjs.forEach((generatedCnpj, index) => {
        logResult({
          label: "CNPJ",
          index,
          showIndex: true,
          result: generatedCnpj,
          options,
        });
      });
    },
  });
};
