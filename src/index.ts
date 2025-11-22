#!/usr/bin/env node
import { Command } from "commander";
import { cpfCommand } from "./commands/cpf";

const program = new Command();

program
  .name("gerar")
  .description("CLI brasileiro para gerar dados fictícios para testes.")
  .version("0.0.1");

program.helpCommand("help", "Exibe informações de ajuda do CLI.");

// TODO: Create automatic registration for commands.
program
  .command(cpfCommand.name)
  .description(cpfCommand.description)
  .option(
    "-a, --amount <amount>",
    "Quantidade a ser gerado.",
    (value: string) => Number(value)
  )
  .action(cpfCommand.action);

program.parse();
