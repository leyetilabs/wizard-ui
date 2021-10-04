import BigNumber from "bignumber.js";
import numeral from "numeral";

import { ONE_TOKEN } from "./constants";

BigNumber.config({ DECIMAL_PLACES: 6, ROUNDING_MODE: BigNumber.ROUND_DOWN });

/**
 * Format Terra amount
 * @param value - string: amount from Terra blockchain
 * @param format - string: numeral format
 * @returns string
 */
export const fromTerraAmount = (
  value: string = "0",
  format = "0,0.00a"
): string => {
  const amount = new BigNumber(value).div(ONE_TOKEN);
  return numeral(amount).format(format).toUpperCase();
};

export const toTerraAmount = (value: string = "0"): string => {
  return new BigNumber(value).dp(6).times(ONE_TOKEN).toString();
};

export const toDecimal = (value: string = "0", dp: number = 6): string => {
  return new BigNumber(value).toFixed(dp).toString();
};

export const toNumber = (value: string = "0"): number => {
  return new BigNumber(value).toNumber();
};

export const BN = (value: string = "0") => {
  return new BigNumber(value);
};
