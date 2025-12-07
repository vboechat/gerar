import { Command } from "commander";
import { CommandBaseOptions, commandBaseOptions } from "./command-options";

export type CommandStructure = {
  name: string;
  description: string;
  action: (this: Command, ...args: any[]) => void | Promise<void>;
};

type CommandBuilderOptions = {
  omitOptions?: CommandBaseOptions[];
};

export const buildCommand = (
  program: Command,
  command: CommandStructure,
  options: CommandBuilderOptions = {}
) => {
  const commandInstance = program
    .command(command.name)
    .description(command.description);

  const baseOptionsKeys = Object.keys(commandBaseOptions).filter(
    (option) => !options.omitOptions?.includes(option as CommandBaseOptions)
  );
  const baseOptions = baseOptionsKeys.map(
    (option) => commandBaseOptions[option as CommandBaseOptions]
  );

  baseOptions.forEach((option) => {
    if ("validator" in option) {
      commandInstance.option(option.flag, option.description, option.validator);
      return;
    }

    commandInstance.option(option.flag, option.description);
  });

  return commandInstance.action(command.action);
};
