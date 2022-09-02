import React, { Fragment, useCallback, useMemo } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { WalletName } from "@wizard-ui/core";
import { WalletReadyState } from "@wizard-ui/core";

// import { Collapse } from "./Collapse";
import { useWalletModal, useWallet, Wallet } from "../hooks";
import { WalletListItem } from "./WalletListItem";

export interface WalletModalProps {
  className?: string;
}

export const WalletModal: FC<WalletModalProps> = ({ className = "" }) => {
  const { wallets, select } = useWallet();
  const { visible, setVisible } = useWalletModal();

  const [installedWallets, otherWallets] = useMemo(() => {
    const installed: Wallet[] = [];
    const notDetected: Wallet[] = [];
    const loadable: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }

    return [installed, [...loadable, ...notDetected]];
  }, [wallets]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleWalletClick = useCallback(
    (walletName: WalletName) => {
      select(walletName);
      handleClose();
    },
    [select, handleClose]
  );

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="wz-modal" onClose={handleClose}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="wz-modal-backdrop" aria-hidden="true" />
        </Transition.Child>

        <div className="wz-modal-wrapper">
          <div className="wz-modal-body">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="wz-modal-content">
                <Dialog.Title as="h3" className="wz-modal-title">
                  Connect wallet
                </Dialog.Title>

                <div className="wz-wallets">
                  {installedWallets.map((wallet) => (
                    <WalletListItem
                      key={wallet.adapter.name}
                      handleClick={() => handleWalletClick(wallet.adapter.name)}
                      wallet={wallet}
                    />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
