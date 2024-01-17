import type { Translate } from "next-translate";

import { toastError } from "@src/components/notification";

export const displayGenericError = (t: Translate) => {
  toastError({
    title: t("unexpectedError"),
  });
};
