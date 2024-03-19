import type { Translate } from "next-translate";

import { toastError } from "@src/components/notification";

import type { Coin } from "./staking_sdk/core/base";
import { formatCoin } from "./staking_sdk/formatters";

export const displayGenericError = (t: Translate) => {
  toastError({
    title: t("common:error"),
  });
};

export const notEnoughGasError = (t: Translate) => {
  toastError({
    title: t("staking:stakingModal.error.notEnoughGas.title"),
  });
};

export const notEnoughAmountError = (t: Translate, minimum: Coin) => {
  const normalisedMinimum = formatCoin(minimum);

  toastError({
    title: t("staking:stakingModal.error.notEnoughAmountError.title", {
      amount: normalisedMinimum,
    }),
  });
};
