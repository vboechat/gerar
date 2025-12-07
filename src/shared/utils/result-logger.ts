import { CommandOptions } from "./command-options";

type ResultWithMask = {
  withMask: string;
  withoutMask: string;
};

type ResultWithoutMask = string;

type LogResultOptions = {
  label: string;
  index?: number;
  showIndex?: boolean;
  result: ResultWithMask | ResultWithoutMask;
  options: CommandOptions;
};

export const logResult = ({
  label,
  index = 0,
  showIndex = false,
  result,
  options,
}: LogResultOptions): void => {
  const indexText = showIndex ? ` ${index + 1})` : ":";

  if (typeof result === "string") {
    console.log(`${label}${indexText} ${result}`);
    return;
  }

  const { masked, unmasked } = options;

  if (unmasked) {
    console.log(`${label}${indexText} Sem Máscara: ${result.withoutMask}`);
    return;
  }

  if (masked) {
    console.log(`${label}${indexText} Com Máscara: ${result.withMask}`);
    return;
  }

  console.log(
    `${label}${indexText} Com Máscara: ${result.withMask} - Sem Máscara: ${result.withoutMask}`
  );
};
