import { Stack, Typography, useTheme } from "@mui/material";
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
      <div className={styles.wrapper} ref={ref}>
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
          <div className={styles.imgWrapper}>
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
          </div>
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
      </div>
    );
  },
);

export default productPanel;
