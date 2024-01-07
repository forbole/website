import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { StaticImageData } from "next/image";
import Image from "next/legacy/image";

import { CtaLink } from "../cta-button";
import * as styles from "./index.module.scss";

type Props = {
  btnLink?: string;
  btnName?: string;
  desc?: string;
  disabled?: boolean;
  imageAlt?: string;
  imageHref: StaticImageData | string;
  img_not_response?: boolean;
  level?: number;
  title?: string;
};

const IntroPanel = ({
  btnLink,
  btnName,
  desc,
  disabled,
  imageAlt,
  imageHref,
  img_not_response,
  level,
  title,
}: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(500));

  return (
    <Stack
      bgcolor="white"
      borderRadius="24px"
      boxShadow="0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12);"
      color="black"
      component="div"
      gap="8px"
      justifyContent="space-between"
      minHeight="100%"
      overflow="hidden"
      sx={{
        [theme.breakpoints.down("tablet")]: {
          maxWidth: "calc(100vw - 40px)",
        },
      }}
    >
      <div style={{ padding: 24 }}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          mb="12px"
        >
          <Typography
            sx={{
              color: "#202A43",
              fontWeight: "590",
              pr: "10px",
              [theme.breakpoints.down("tablet")]: {
                fontSize: "18px",
                width: "max-content",
              },
              [theme.breakpoints.up("tablet")]: {
                fontSize: "20px",
              },
            }}
            variant={level ? (`h${level}` as "h1") : undefined}
          >
            {title}
          </Typography>
          {btnName && btnLink && (
            <CtaLink disabled={disabled} href={btnLink}>
              {btnName}
            </CtaLink>
          )}
        </Stack>
        <div>
          <Typography
            sx={{
              color: "#2A1A6A",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "22px",
            }}
            variant={level ? (`h${level + 1}` as "h1") : undefined}
          >
            {desc}
          </Typography>
        </div>
      </div>
      <div
        className={[
          styles.imageWrap,
          img_not_response ? styles.noResponse : "",
        ].join(" ")}
      >
        {imageHref && (
          <Image
            alt={imageAlt || ""}
            layout="fill"
            objectFit={matches ? "fill" : "contain"}
            objectPosition="bottom right"
            src={imageHref}
          />
        )}
      </div>
    </Stack>
  );
};

export default IntroPanel;
