import {
  Coins,
  Coin,
  MsgExecuteContract,
  LCDClient,
} from "@terra-money/terra.js";

type EstimateFeeOpts = {
  client: LCDClient;
  address: string;
  msgs: MsgExecuteContract[] | null | undefined;
  opts: { gasAdjustment?: number };
};

export const estimateFee = async ({
  client,
  address,
  msgs,
  opts: { gasAdjustment },
}: EstimateFeeOpts) => {
  if (msgs == null || client == null || address == null) {
    throw new Error("`client`, `address` or `msgs` is null");
  }

  const txOptions = {
    msgs,
    gasPrices: new Coins([new Coin("uusd", 0.15)]),
    gasAdjustment,
    feeDenoms: ["uusd"],
  };

  const accountInfo = await client.auth.accountInfo(address);

  return client.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  );
};
