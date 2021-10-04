export type HumanAddr = string;
export type CanonicalAddr = string;
export type CW20Addr = string;

export type StableDenom = string;
export type bAssetDenom = string;
export type AssetDenom = string;
export type Denom = StableDenom | bAssetDenom | AssetDenom;

export type WASMContractResult<T extends {} = {}> = {
  Result: string;
} & T;

export type CW20AssetInfo = {
  native_token: never;
  token: { contract_addr: CW20Addr };
};
export type NativeAssetInfo = {
  token: never;
  native_token: { denom: StableDenom };
};

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

export type Asset = {
  info: AssetInfo;
  amount: string;
};

export type Pool = {
  assets: [Asset, Asset];
  total_share: string;
};

export type Pair = {
  asset_infos: [AssetInfo, AssetInfo];
  contract: CW20Addr;
  lpToken: CW20Addr;
};

export type Token = {
  protocol: string;
  symbol: string;
  token: string;
  icon: string;
};

export type Tokens = {
  [token: string]: Token;
};

export type Routes = {
  [from: string]: {
    [to: string]: Pair;
  };
};

export interface LocalNetworkConfig {
  fee: { gasPrice: number; amount: number };
}

export type Data = {
  mainnet: {
    tokens: any;
    pairs: any;
  };
  testnet: {
    tokens: any;
    pairs: any;
  };
};
