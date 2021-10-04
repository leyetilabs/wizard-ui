import { AssetInfo } from "./types";

export const isNativeToken = (token: string = ""): boolean => {
  return token.startsWith("u");
};

export const isNativeAsset = (info: AssetInfo): boolean => {
  return "native_token" in info;
};

export const toAssetInfo = (token: string): AssetInfo => {
  if (isNativeToken(token)) {
    //@ts-expect-error
    return { native_token: { denom: token } };
  }

  //@ts-expect-error
  return { token: { contract_addr: token } };
};

type ToAssetOpts = {
  amount: string;
  token: string;
};

export const toAsset = ({ amount, token }: ToAssetOpts) => {
  return {
    amount,
    info: toAssetInfo(token),
  };
};

export const getTokenDenom = (info: AssetInfo): string => {
  if (isNativeAsset(info)) {
    return info.native_token.denom;
  }

  return info.token?.contract_addr;
};

export const getTokenDenoms = (infos: AssetInfo[]): string[] => {
  return infos.map((info) => getTokenDenom(info));
};
