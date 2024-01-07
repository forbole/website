import { Divider, Stack, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import CtaButton, { CtaLink } from "@src/components/cta-button";

import usePlans from "./config";
import * as styles from "./index.module.scss";

const clickItem = 2;

type Props = { btnHref: () => void };

const FourTable = ({ btnHref }: Props) => {
  const { t } = useTranslation("developer_tools");
  const theme = useTheme();
  const plans = usePlans();

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "flex-end",
        gap: "16px",
        minHeight: "536px",
        [theme.breakpoints.down("laptop")]: {
          alignItems: "center",
          flexDirection: "column",
          gap: "24px",
          justifyContent: "center",
        },
      }}
    >
      {plans.map((Plan, indexTop) => (
        <div
          className={[
            indexTop === clickItem ? styles.active : "",
            styles.plan,
          ].join(" ")}
          key={indexTop}
        >
          <Stack
            className={indexTop === clickItem ? styles.popular : styles.none}
            direction="row"
          >
            <img alt="" src="/icons/Group.png" />
            <Typography component="span">{t("popular")}</Typography>
          </Stack>
          <Typography
            sx={{
              color: "#202A43",
              fontSize: "20px",
              fontWeight: "590",
            }}
          >
            {Plan.title}
          </Typography>
          <div className={styles.text}>
            <Typography
              className={indexTop === clickItem ? styles.money : ""}
              sx={{
                color: "#202A43",
                fontSize: "32px",
                fontWeight: "590",
                letterSpacing: "-0.508px",
                marginTop: "-23px",
                pr: "7px",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: "16px",
                  fontWeight: "590",
                  pr: "3px",
                }}
              >
                $
              </Typography>
              {Plan.price}
            </Typography>
            {Plan.currency}
          </div>
          <Typography
            sx={{
              color: "#202A43",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {Plan.description}
          </Typography>
          <div>
            <Divider
              style={{
                marginTop: "24px",
              }}
            />
            {Array.isArray(Plan.features) ? (
              Plan.features.map((item, index) => (
                <div className={styles.feature} key={index}>
                  <img
                    alt=""
                    src={Plan.image}
                    style={{ height: "25px", width: "25px" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "590",
                      paddingLeft: "5px",
                    }}
                  >
                    {item}
                  </Typography>
                </div>
              ))
            ) : (
              <div className={styles.planImg} key={indexTop}>
                <img
                  alt=""
                  src={Plan.image}
                  style={{ height: "25px", width: "25px" }}
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "590",
                    paddingLeft: "5px",
                  }}
                >
                  {Plan.features}
                </Typography>
              </div>
            )}
          </div>
          {Plan.btnHref ? (
            <CtaLink href={Plan.btnHref} linkClassName={styles.cta}>
              {Plan.btnName}
            </CtaLink>
          ) : (
            <CtaButton className={styles.cta} onClick={btnHref}>
              {Plan.btnName}
            </CtaButton>
          )}
        </div>
      ))}
    </Stack>
  );
};

export default FourTable;
