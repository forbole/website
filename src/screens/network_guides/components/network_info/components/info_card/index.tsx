/* eslint-disable no-nested-ternary */
import useTranslation from "next-translate/useTranslation";

import { convertToMoney } from "@src/utils/convert_to_money";

import * as styles from "./index.module.scss";

const InfoCard = ({ stats, title, type }: any) => {
  const { t } = useTranslation("staking");

  return (
    <div className={styles.root}>
      <h6>{title}</h6>
      {title === t("staked by forbole") ? (
        <h3>
          {type}
          {stats === "-" ? stats : convertToMoney(stats)}
        </h3>
      ) : title === t("apy") ? (
        <h3>
          {(parseFloat(stats) * 100).toFixed(1)} {type}
        </h3>
      ) : title === t("commission") ? (
        <h3>
          {parseFloat(stats) * 100} {type}
        </h3>
      ) : (
        <h3>{stats}</h3>
      )}
    </div>
  );
};

export default InfoCard;
