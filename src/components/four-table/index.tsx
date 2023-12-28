import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import CtaButton from "@src/components/cta-button";

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
        <Box
          className={indexTop === clickItem ? styles.active : ""}
          key={indexTop}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            boxShadow:
              "0px 10px 32px -4px rgba(245, 20, 47, 0.16), 0px 6px 14px -6px rgba(249, 106, 122, 0.20)",
            flexBasis: "270px",
            flexGrow: 1,
            flexShrink: 1,
            height: "496px",
            padding: "24px",
            position: "relative",
            [theme.breakpoints.down("laptop")]: {
              flexBasis: "max-content",
              flexGrow: 0,
              flexShrink: 0,
              width: "75%",
            },
          }}
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
          <Box
            sx={{
              alignItems: "baseline",
              color: "#202A43",
              display: "flex",
              fontSize: "12px",
              fontWeight: "590",
              mt: "20px",
              whiteSpace: "nowrap",
            }}
          >
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
          </Box>
          <Typography
            sx={{
              color: "#202A43",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {Plan.description}
          </Typography>
          <Box>
            <Divider
              style={{
                marginTop: "24px",
              }}
            />
            {Array.isArray(Plan.features) ? (
              Plan.features.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
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
                </Box>
              ))
            ) : (
              <Box
                key={indexTop}
                sx={{
                  display: "flex",
                  marginTop: "20px",
                  [theme.breakpoints.down("laptop")]: {
                    marginTop: "16px",
                  },
                }}
              >
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
              </Box>
            )}
          </Box>
          {Plan.btnHref ? (
            <Link className={styles.cta} href={Plan.btnHref}>
              <CtaButton>{Plan.btnName}</CtaButton>
            </Link>
          ) : (
            <CtaButton className={styles.cta} onClick={btnHref}>
              {Plan.btnName}
            </CtaButton>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default FourTable;
