import { useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import { MsgExecuteContract, Coin } from "@terra-money/terra.js";
import {
  toTerraAmount,
  useAddress,
  useEstimateFee,
  useTx,
  useTxInfo,
} from "@arthuryeti/terra";

export default function Web() {
  const address = useAddress();
  const [txHash, setTxHash] = useState<string | null>(null);

  const msgs = useMemo(() => {
    const coins = [new Coin("uusd", toTerraAmount(2))];

    return [
      new MsgExecuteContract(
        address,
        "terra1mxy8lmf2jeyr7js7xvm046fssyfa5a9pm78fpn",
        {
          swap: {
            offer_asset: {
              info: {
                native_token: {
                  denom: "uusd",
                },
              },
              amount: toTerraAmount(2),
            },
          },
        },
        coins
      ),
    ];
  }, []);

  const { fee, isLoading } = useEstimateFee({
    msgs,
  });

  const { submit } = useTx({
    onPosting: () => {
      console.log("onPosting");
    },
    onBroadcasting: (txHash) => {
      console.log("onBroadcasting");
      setTxHash(txHash);
    },
    onError: () => {
      console.log("onError");
    },
  });

  useTxInfo({
    txHash,
    onSuccess: () => {
      console.log("onSuccess");
    },
    onError: () => {
      console.log("onError");
    },
  });

  const handleClick = () => {
    submit({
      msgs,
      fee,
    });
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleClick}
        isDisabled={fee == null}
        isLoading={isLoading}
      >
        Submit tx
      </Button>
    </div>
  );
}
