import type { Translate } from "next-translate";
import type { FC } from "react";

import IconKeplr from "@src/components/icons/keplr.svg";

import { WalletId } from "./staking_sdk/core";

export const walletsIcons: Record<WalletId, FC<{ className?: string }>> = {
  [WalletId.Keplr]: IconKeplr,
};

export const getWalletName = (walletId: WalletId, t: Translate) => {
  switch (walletId) {
    case WalletId.Keplr:
      return t("staking:wallets.keplr");

    default: {
      const exhaustiveCheck: never = walletId;

      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
    }
  }
};
