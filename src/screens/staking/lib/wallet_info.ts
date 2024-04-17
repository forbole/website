import type { Translate } from "next-translate";
import type { FC } from "react";

import IconKeplr from "@src/components/icons/keplr.svg";
import IconLeap from "@src/components/icons/leap.svg";
import IconPhantom from "@src/components/icons/phantom.svg";
import IconSolflare from "@src/components/icons/solflare.svg";

import { WalletId } from "./staking_sdk/core/base";

export const walletsIcons: Record<WalletId, FC<{ className?: string }>> = {
  [WalletId.Keplr]: IconKeplr,
  [WalletId.Leap]: IconLeap,
  [WalletId.Phantom]: IconPhantom,
  [WalletId.Solflare]: IconSolflare,
};

export const getWalletName = (walletId: WalletId, t: Translate) => {
  switch (walletId) {
    case WalletId.Keplr:
      return t("staking:wallets.keplr");

    case WalletId.Leap:
      return t("staking:wallets.leap");

    case WalletId.Solflare:
      return t("staking:wallets.solflare");

    case WalletId.Phantom:
      return t("staking:wallets.phantom");

    default: {
      const exhaustiveCheck: never = walletId;

      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
  }
};
