import type { FC, MouseEventHandler } from "react";
import { WalletReadyState } from "@wizard-ui/core";
import type { Wallet } from "@wizard-ui/react";

import { WalletIcon } from "./WalletIcon";

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({
  handleClick,
  tabIndex,
  wallet,
}) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      tabIndex={tabIndex}
      className="wz-list-button"
    >
      <div>
        <div>
          <WalletIcon wallet={wallet} />
          <div>{wallet.adapter.name}</div>
        </div>
        {wallet.readyState === WalletReadyState.Installed && <p>Installed</p>}
      </div>
    </button>
  );
};
