import BigNumber from "bignumber.js";

BigNumber.config({
  DECIMAL_PLACES: 6,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-10, 20],
});

export const num = (value: BigNumber.Value = "0"): BigNumber => {
  return new BigNumber(value);
};

export enum NumberFormatSpecifier {
  PERCENTAGE = 1,
  CURRENCY = 2,
  FLOAT = 3,
}

export interface NumberFormatOptions {
  formatSpecifier?: NumberFormatSpecifier;
  // Whether the value is in micro denom, in which case, the formatted number will be converted to base units
  shouldDivide?: boolean;
}

export function formatAmount(
  value?: BigNumber.Value | null,
  options?: NumberFormatOptions
) {
  if (value == null) {
    return "--";
  }

  const valOrZero = num(value ?? 0);
  const valToFormat = options?.shouldDivide
    ? valOrZero.div(10 ** 6)
    : valOrZero;
  const currentDp = valToFormat.dp();

  let formatOptions = {
    prefix: "",
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
    secondaryGroupSize: 3,
    fractionGroupSeparator: " ",
    fractionGroupSize: 0,
    suffix: "",
  };
  let dp = 2;
  if (currentDp != null) {
    if (!(currentDp > 2)) {
      dp = currentDp;
    }
  }

  if (options?.formatSpecifier == NumberFormatSpecifier.PERCENTAGE) {
    formatOptions.suffix = "%";
  }

  if (options?.formatSpecifier == NumberFormatSpecifier.CURRENCY) {
    formatOptions.prefix = "$";
  }

  if (options?.formatSpecifier == NumberFormatSpecifier.FLOAT) {
    if (currentDp != null) {
      if (currentDp > 6) {
        dp = 6;
      } else {
        dp = currentDp;
      }
    }
  }

  return valToFormat.toFormat(dp, formatOptions);
}

export const numberAccept = /[\d.]+/g;

export function parseNumber(string: string) {
  return (string.match(numberAccept) || []).join("");
}

export function formatFloatingPointNumber(value: string, maxDigits: number) {
  const parsed = parseNumber(value);
  const [head, tail] = parsed.split(".");
  // Avoid rounding errors at toLocaleString as when user enters 1.239 and maxDigits=2 we
  // must not to convert it to 1.24, it must stay 1.23
  const scaledTail = tail != null ? tail.slice(0, maxDigits) : "";

  const number = Number.parseFloat(`${head}.${scaledTail}`);

  if (Number.isNaN(number)) {
    return "";
  }

  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits,
  });

  if (parsed.includes(".")) {
    const [formattedHead] = formatted.split(".");

    // skip zero at digits position for non fixed floats
    // as at digits 2 for non fixed floats numbers like 1.50 has no sense, just 1.5 allowed
    // but 1.0 has sense as otherwise you will not be able to enter 1.05 for example
    const formattedTail =
      scaledTail !== "" && scaledTail[maxDigits - 1] === "0"
        ? scaledTail.slice(0, -1)
        : scaledTail;

    return `${formattedHead}.${formattedTail}`;
  }

  return formatted;
}
