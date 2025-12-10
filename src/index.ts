#!/usr/bin/env node
import { Command } from "commander";
import { registerCpfCommand } from "./commands/cpf";
import { registerCnpjCommand } from "./commands/cnpj";

const program = new Command();

program
  .name("gerar")
  .description("CLI brasileiro para gerar dados fictícios para testes.")
  .version("0.0.1");

program.helpCommand("help", "Exibe informações de ajuda do CLI.");

// TODO: Create automatic registration for commands.
registerCpfCommand(program);
registerCnpjCommand(program);

program.parse();
