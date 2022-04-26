import BigNumber from "bignumber.js";
import numeral from "numeral";

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-10, 20],
});

export const num = (value: BigNumber.Value = "0"): BigNumber => {
  return new BigNumber(value);
};

export const formatAmount = (
  value: string | number | null,
  shouldDivide: boolean = false,
  decimal: number = 6
) => {
  if (value == null) {
    return "--";
  }

  let newValue = num(value);

  if (newValue.isNaN()) {
    return 0;
  }

  if (shouldDivide) {
    newValue = num(value).div(10 ** decimal);
  }

  if (newValue.eq(0)) {
    return newValue.toFormat(0, BigNumber.ROUND_DOWN);
  }

  if (newValue.gt(1000000)) {
    return numeral(newValue.toNumber())
      .format("0.00a", Math.floor)
      .toUpperCase();
  }

  if (newValue.lt(0.01)) {
    return newValue.toFormat(6, BigNumber.ROUND_DOWN);
  }

  return newValue.toFormat(3, BigNumber.ROUND_DOWN);
};
