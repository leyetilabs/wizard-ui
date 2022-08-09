import BigNumber from "bignumber.js";
import { format } from "d3-format";

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-10, 20],
});

export const num = (value: BigNumber.Value = "0"): BigNumber => {
  return new BigNumber(value);
};

export enum NumberFormatSpecifier {
  FULL_CURRENCY = "$,.2f",
  APPROX_CURRENCY = "$~s",
  LARGE_NUMBER = "~s",
  DEFAULT_FLOAT = ",.6~f", // Max 6 decimal places
  INTEGER_PERCENTAGE = ".0%",
  DEFAULT_PERCENTAGE = ".2%",
  PRECISE_PERCENTAGE = ".6%",
  APPROX_FLOAT = ",.2f", // Max 2 decimal places
  FULL_INT = ".0f",
}

export interface NumberFormatOptions {
  // Whether the value is in micro denom, in which case, the formatted number will be converted to base units
  shouldDivide?: boolean;
  // The format specifier to use, see https://github.com/d3/d3-format
  formatSpecifier?: NumberFormatSpecifier | string;
  // What to render if the value given is null
  defaultFallback?: string;
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

  return format(
    options?.formatSpecifier ?? NumberFormatSpecifier.DEFAULT_FLOAT
  )(valToFormat.toNumber());
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
