import { Coins, Coin, Msg, LCDClient, SignerData } from "@terra-money/terra.js";

interface Options {
  client: LCDClient;
  address: string;
  msgs: Msg[] | null | undefined;
  opts?: { gasAdjustment?: number };
}

export const estimateFee = async ({ client, address, msgs, opts }: Options) => {
  if (msgs == null || client == null || address == null) {
    throw new Error("`client`, `address` or `msgs` is null");
  }

  const accountInfo = await client.auth.accountInfo(address);
  const signerData: SignerData = {
    sequenceNumber: accountInfo.getSequenceNumber(),
    publicKey: accountInfo.getPublicKey(),
  };

  const { gasAdjustment } = opts ?? { gasAdjustment: 1.2 };

  return client.tx.estimateFee([signerData], {
    msgs,
    gasPrices: new Coins([new Coin("uusd", 0.15)]),
    gasAdjustment,
    feeDenoms: ["uusd"],
  });
};
