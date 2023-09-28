import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import plans from "./config";
import styles from "./styles.module.css";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import CtaButton from "@components/cta-button";
import { useRouter } from "next/router";

type Props = { btnHref: () => void };
const FourTable = ({ btnHref }: Props) => {
  const { t } = useTranslation("developer_tools");
  const theme = useTheme();
  const [clickItem, setClickItem] = useState<number | null>(2);
  const router = useRouter();
  // const handleClick = (index: number) => {
  //   setClickItem(index);
  // };

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "flex-end",
        minHeight: "536px",
        gap: "16px",
        [theme.breakpoints.down("laptop")]: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          // minHeight:'1200px',
        },
      }}
    >
      {plans.map((Plan, index) => (
        <Box
          key={index}
          // onClick={() => handleClick(index)}
          className={index === clickItem ? styles.active : ""}
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
            // transition: theme.transitions.create([
            //   "flex-basis",
            //   "height",
            //   'box-shadow',
            //   'width',
            // ],
            //
            // ),
          }}
        >
          <Stack
            direction={"row"}
            className={index === clickItem ? styles.popular : styles.none}
          >
            <img src="/icons/Group.png"></img>
            <Typography component={"span"}>Popular!</Typography>
          </Stack>
          <Typography
            sx={{
              color: "#202A43",
              fontSize: "20px",
              fontWeight: "590",
            }}
          >
            {t(Plan.title)}
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
              className={index === clickItem ? styles.money : ""}
              sx={{
                color: "#202A43",
                fontSize: "32px",
                fontWeight: "590",
                marginTop: "-23px",
                pr: "7px",
                // transition: theme.transitions.create([
                //   "font-size",
                // ]),
                letterSpacing: "-0.508px",
              }}
            >
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  fontWeight: "590",
                  pr: "3px",
                }}
              >
                $
              </Typography>
              {t(Plan.price)}
            </Typography>
            {t(Plan.currency)}
          </Box>
          <Typography
            sx={{
              color: "#202A43",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {t(Plan.description)}
          </Typography>
          <Box
          // sx={{
          //   width: "80%",
          // }}
          >
            <Divider
              style={{
                marginTop: "24px",
              }}
            ></Divider>
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
                    style={{ width: "25px", height: "25px" }}
                    src={Plan.image}
                    alt=""
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "590",
                      paddingLeft: "5px",
                    }}
                  >
                    {t(item)}
                  </Typography>
                </Box>
              ))
            ) : (
              <Box
                key={index}
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  [theme.breakpoints.down("laptop")]: {
                    marginTop: "16px",
                  },
                }}
              >
                <img
                  style={{ width: "25px", height: "25px" }}
                  src={Plan.image}
                  alt=""
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "590",
                    paddingLeft: "5px",
                  }}
                >
                  {t(Plan.features)}
                </Typography>
              </Box>
            )}
          </Box>
          <CtaButton
            sx={{
              position: "absolute",
              left: "24px",
              right: "24px",
              bottom: "24px",
              [theme.breakpoints.down("laptop")]: { display: "none" },
            }}
            onClick={Plan.btnHref ? () => router.push(Plan.btnHref) : btnHref}
          >
            {t(Plan.btnName)}
          </CtaButton>
        </Box>
      ))}
    </Stack>
  );
};

export default FourTable;
