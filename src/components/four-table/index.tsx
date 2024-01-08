import useTranslation from "next-translate/useTranslation";

import CtaButton, { CtaLink } from "@src/components/cta-button";

import usePlans from "./config";
import * as styles from "./index.module.scss";

const clickItem = 2;

type Props = { onBtnClick: () => void };

const FourTable = ({ onBtnClick }: Props) => {
  const { t } = useTranslation("developer_tools");
  const plans = usePlans();

  return (
    <div className={styles.wrapper}>
      {plans.map((Plan, indexTop) => (
        <div
          className={[
            indexTop === clickItem ? styles.active : "",
            styles.plan,
          ].join(" ")}
          key={indexTop}
        >
          <div
            className={[
              styles.group,
              indexTop === clickItem ? styles.popular : styles.none,
            ].join(" ")}
          >
            <img alt="" src="/icons/Group.png" />
            <span>{t("popular")}</span>
          </div>
          <h3 className={styles.title}>{Plan.title}</h3>
          <div className={styles.text}>
            <p
              className={[
                indexTop === clickItem ? styles.money : "",
                styles.price,
              ].join(" ")}
            >
              <span className={styles.dollar}>$</span>
              {Plan.price}
            </p>
            {Plan.currency}
          </div>
          <p className={styles.description}>{Plan.description}</p>
          <div>
            <div className={styles.divider} />
            {Array.isArray(Plan.features) ? (
              Plan.features.map((item, index) => (
                <div className={styles.feature} key={index}>
                  <img
                    alt=""
                    src={Plan.image}
                    style={{ height: "25px", width: "25px" }}
                  />
                  <span className={styles.item}>{item}</span>
                </div>
              ))
            ) : (
              <div className={styles.planImg} key={indexTop}>
                <img
                  alt=""
                  src={Plan.image}
                  style={{ height: "25px", width: "25px" }}
                />
                <p className={styles.features}>{Plan.features}</p>
              </div>
            )}
          </div>
          {Plan.btnHref ? (
            <CtaLink href={Plan.btnHref} linkClassName={styles.cta}>
              {Plan.btnName}
            </CtaLink>
          ) : (
            <CtaButton className={styles.cta} onClick={onBtnClick}>
              {Plan.btnName}
            </CtaButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default FourTable;
