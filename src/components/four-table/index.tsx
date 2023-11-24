import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";

import CtaButton from "@components/cta-button";

import usePlans from "./config";
import styles from "./styles.module.css";

type Props = { btnHref: () => void };
const FourTable = ({ btnHref }: Props) => {
  const { t } = useTranslation("developer_tools");
  const theme = useTheme();
  const [clickItem] = useState<number | null>(2);
  const router = useRouter();
  const plans = usePlans();

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "flex-end",
        minHeight: "536px",
        gap: "16px",
        [theme.breakpoints.down("laptop")]: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        },
      }}
    >
      {plans.map((Plan, indexTop) => (
        <Box
          className={indexTop === clickItem ? styles.active : ""}
          key={indexTop}
          sx={{
            position: "relative",
            height: "496px",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "270px",
            padding: "24px",
            borderRadius: "24px",
            backgroundColor: "#fff",
            boxShadow:
              "0px 10px 32px -4px rgba(245, 20, 47, 0.16), 0px 6px 14px -6px rgba(249, 106, 122, 0.20)",
            [theme.breakpoints.down("laptop")]: {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "max-content",
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
              display: "flex",
              alignItems: "baseline",
              color: "#202A43",
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
                marginTop: "-23px",
                pr: "7px",
                letterSpacing: "-0.508px",
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
                    marginTop: "20px",
                    display: "flex",
                  }}
                >
                  <img
                    alt=""
                    src={Plan.image}
                    style={{ width: "25px", height: "25px" }}
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
                  marginTop: "20px",
                  display: "flex",
                  [theme.breakpoints.down("laptop")]: {
                    marginTop: "16px",
                  },
                }}
              >
                <img
                  alt=""
                  src={Plan.image}
                  style={{ width: "25px", height: "25px" }}
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
          <CtaButton
            onClick={Plan.btnHref ? () => router.push(Plan.btnHref) : btnHref}
            sx={{
              position: "absolute",
              left: "24px",
              right: "24px",
              bottom: "24px",
              [theme.breakpoints.down("laptop")]: { display: "none" },
            }}
          >
            {Plan.btnName}
          </CtaButton>
        </Box>
      ))}
    </Stack>
  );
};

export default FourTable;
