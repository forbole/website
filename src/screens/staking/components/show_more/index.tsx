import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import IconChevronDown from "src/components/icons/icon_chevron_down.svg";

import * as styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
};

const ShowMore = (({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("staking");

  return isOpen ? (
    (children as string)
  ) : (
    <div className={styles.buttonWrap}>
      <button onClick={() => setIsOpen(true)}>
        <span>{t("showMore")}</span>
        <IconChevronDown />
      </button>
    </div>
  );
}) as unknown as React.FC<Props>;

export default ShowMore;
