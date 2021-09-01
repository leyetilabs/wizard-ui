import BigNumber from "bignumber.js";

BigNumber.config({ EXPONENTIAL_AT: [-18, 20] });

const rm = BigNumber.ROUND_DOWN;

export const dp = (symbol?: string) =>
  !symbol || lookupSymbol(symbol) === "UST" ? 2 : 6;

export const getIsTokenNative = (token = "") => token.startsWith("u");

export const validateDp = (value: string, symbol?: string, decimal?: number) =>
  new BigNumber(value)
    .times(new BigNumber(10).pow(decimal ?? dp(symbol)))
    .isInteger();

export const decimal = (value = "0", dp = 6) =>
  new BigNumber(value).decimalPlaces(dp, rm).toString();

export const toFixed = (value = "0", dp = 6) =>
  new BigNumber(value).toFixed(dp, rm).toString();

export const toNumber = (value = "0") => new BigNumber(value).toNumber();

export const lookupSymbol = (symbol?: string) =>
  symbol === "uluna"
    ? "Luna"
    : symbol?.startsWith("u")
    ? symbol.slice(1, 3).toUpperCase() + "T"
    : symbol ?? "";

export const parseResult = <Parsed>(params: { result: string } | null) => {
  return params ? (JSON.parse(params.result) as Parsed) : undefined;
};

export const parseResults = <Parsed>(object: any) =>
  Object.entries(object).reduce((acc, [token, data]) => {
    const next = data && parseResult<Parsed>(data as any);
    return Object.assign({}, acc, next && { [token]: next });
  }, {});
