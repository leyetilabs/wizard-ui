import React, { FC } from "react";
import { truncate } from "@wizard-ui/core";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown as ChevronDownIcon } from "lucide-react";

import { useWallet, useWalletModal } from "../hooks";

export function WalletButton() {
  const { visible, setVisible } = useWalletModal();
  const { address, connected, disconnect, connecting } = useWallet();

  function handleClick() {
    setVisible(!visible);
  }

  if (connected) {
    return (
      <Menu as="div" className="wz-menu">
        <div>
          <Menu.Button className="wz-connect-button">
            <span>{truncate(address)}</span>
            <span className="wz-icon">
              <ChevronDownIcon size="1rem" />
            </span>
          </Menu.Button>
        </div>

        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="wz-menu-items">
            <Menu.Item>
              <button
                type="button"
                className="wz-menu-item"
                onClick={() => setVisible(true)}
              >
                Change wallet
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                type="button"
                className="wz-menu-item"
                onClick={disconnect}
              >
                Disconnect
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  return (
    <button className="wz-connect-button" type="button" onClick={handleClick}>
      {connecting ? <Spinner /> : "Connect Wallet"}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="wz-spinner"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
