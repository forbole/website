import useTranslation from "next-translate/useTranslation";

import * as styles from "./staking-label.module.scss";

const StakingLabel = () => {
  const { t } = useTranslation("staking");

  return (
    <span className={styles.label} data-test="staking-card-label">
      {t("stakingLabel")}
    </span>
  );
};

export default StakingLabel;
