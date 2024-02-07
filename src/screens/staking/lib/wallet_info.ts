import type { Translate } from "next-translate";
import type { FC } from "react";

import IconKeplr from "@src/components/icons/keplr.svg";
import IconLeap from "@src/components/icons/leap.svg";

import { WalletId } from "./staking_sdk/core";

export const walletsIcons: Record<WalletId, FC<{ className?: string }>> = {
  [WalletId.Keplr]: IconKeplr,
  [WalletId.Leap]: IconLeap,
};

export const getWalletName = (walletId: WalletId, t: Translate) => {
  switch (walletId) {
    case WalletId.Keplr:
      return t("staking:wallets.keplr");

    case WalletId.Leap:
      return t("staking:wallets.leap");

    default: {
      const exhaustiveCheck: never = walletId;

      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
  }
};
