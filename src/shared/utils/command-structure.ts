import { Command } from "commander";

export type CommandStructure = {
  name: string;
  description: string;
  action: (this: Command, ...args: any[]) => void | Promise<void>;
};
