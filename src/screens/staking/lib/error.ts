import type { Translate } from "next-translate";

import { toastError } from "@src/components/notification";

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
