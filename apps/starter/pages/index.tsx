import { useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { MsgExecuteContract, Coin } from "@terra-money/terra.js";
import { num, useAddress, useEstimateFee, useTx } from "@arthuryeti/terra";

export default function Web() {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (address == null) {
      return;
    }

    const amount = num(2)
      .times(10 ** 6)
      .toNumber();

    const coins = [new Coin("uusd", amount)];

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
              amount,
            },
          },
        },
        coins,
      ),
    ];
  }, [address]);

  const { fee, isLoading } = useEstimateFee({
    msgs,
  });

  const { submit } = useTx({
    onPosting: () => {
      console.log("onPosting");
    },
    onBroadcasting: () => {
      console.log("onBroadcasting");
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
