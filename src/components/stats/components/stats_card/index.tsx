import useTranslation from "next-translate/useTranslation";

import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { tooltipId } from "@src/components/tooltip";
import { useCounter } from "@src/screens/staking/components/hooks";
import { convertToMoney } from "@src/utils/convert_to_money";

import * as styles from "./index.module.scss";

type Props = {
  red?: boolean;
  stats: number | string;
  title: string;
};

const StatsCard = ({ red, stats, title }: Props) => {
  const { t } = useTranslation("common");
  const { counterRef, counterValue } = useCounter(stats);

  const tooltipContent = (() => {
    if (title === t("full tvl")) {
      return t("full tvl tooltip 2");
    }

    if (title === t("users staking")) {
      return t("users staking tooltip");
    }

    if (title === t("supporting networks")) {
      return t("supporting networks tooltip");
    }

    return "";
  })();

  return (
    <div
      className={[styles.root, red ? styles.red : ""].join(" ")}
      ref={counterRef}
    >
      <h6 className={styles.title}>
        {title}{" "}
        <IconInfoCircle
          data-tooltip-content={tooltipContent}
          data-tooltip-id={tooltipId}
        />
      </h6>
      {title === t("full tvl") && stats === "-" && <h3>{`$ ${stats}`}</h3>}
      {title === t("full tvl") && stats !== "-" && (
        <h3>{`$ ${convertToMoney(counterValue)}`}</h3>
      )}
      {title === t("users staking") && stats === "-" && <h3>{`${stats}`}</h3>}
      {title === t("users staking") && stats !== "-" && (
        <h3>{convertToMoney(counterValue)}</h3>
      )}
      {title === t("supporting networks") && (
        <h3>{Math.floor(counterValue as number)}</h3>
      )}
    </div>
  );
};

export default StatsCard;
