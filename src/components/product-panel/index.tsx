import { Box, Stack, Typography, useTheme } from "@mui/material";
import { forwardRef } from "react";

import * as styles from "./index.module.scss";

type Props = {
  children?: React.ReactNode;
  // @deprecated
  imageHref?: string;
  imageHrefs?: string[];
  imgFull?: boolean;
  index: number;
  title?: string;
  value: number;
};

const productPanel = forwardRef<HTMLDivElement, Props>(
  ({ children, imageHref, imageHrefs, imgFull, index, title, value }, ref) => {
    const theme = useTheme();

    // eslint-disable-next-line eqeqeq
    if (index != value) {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>;
    }

    return (
      <Box
        component="div"
        ref={ref}
        sx={{
          background:
            "linear-gradient(179deg, #FFF 0%, rgba(255, 255, 255, 0.50) 34.90%, #FFF 100%)",
          borderRadius: "40px",
          boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.16)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          [theme.breakpoints.down("laptop")]: {
            padding: "32px 24px",
          },
          [theme.breakpoints.up("laptop")]: {
            padding: "64px",
          },
        }}
      >
        {title && (
          <Typography
            sx={{
              color: "#202A43",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
        )}
        <Stack
          direction="row"
          sx={{
            gap: imgFull ? theme.spacing(4) : theme.spacing(7),
            [theme.breakpoints.down("tablet")]: {
              flexDirection: "column",
            },
            [theme.breakpoints.up("tablet")]: {
              flexDirection: "row",
            },
          }}
        >
          <Box
            sx={{
              "& img": {
                display: "block",
                width: "100%",
              },
              "borderRadius": "8px",
              "boxShadow":
                "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
              "height": "max-content",
              "m": "16px",
              "overflow": "hidden",
              "position": "relative",
              [theme.breakpoints.down("tablet")]: {
                boxShadow: imgFull ? "0" : "",
                m: "8px",
                mx: imgFull ? "-24px" : "",
                width: "auto",
              },
              "width": "420px",
            }}
          >
            {imageHrefs ? (
              <>
                <img
                  alt=""
                  className={styles.imgMobile}
                  loading="lazy"
                  src={imageHrefs[0]}
                />
                <img
                  alt=""
                  className={styles.imgDesktop}
                  loading="lazy"
                  src={imageHrefs[1]}
                />
              </>
            ) : (
              <img alt="" loading="lazy" src={imageHref} />
            )}
          </Box>
          <Stack
            sx={{
              alignItems: "flex-start",
              gap: theme.spacing(4),
              textAlign: "left",
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Box>
    );
  },
);

export default productPanel;
