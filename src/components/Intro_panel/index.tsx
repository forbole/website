import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import type { StaticImageData } from "next/image";
import Image from "next/legacy/image";
import Link from "next/link";

import CtaButton from "../cta-button";

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
      <Box p="24px">
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          mb="12px"
        >
          <Typography
            sx={{
              fontWeight: "590",
              pr: "10px",
              color: "#202A43",
              [theme.breakpoints.up("tablet")]: {
                fontSize: "20px",
              },
              [theme.breakpoints.down("tablet")]: {
                width: "max-content",
                fontSize: "18px",
              },
            }}
            variant={level ? (`h${level}` as "h1") : undefined}
          >
            {title}
          </Typography>
          {btnName && btnLink && (
            <Link href={btnLink}>
              <CtaButton disabled={disabled} variant="contained">
                {btnName}
              </CtaButton>
            </Link>
          )}
        </Stack>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "400",
              color: "#2A1A6A",
            }}
            variant={level ? (`h${level + 1}` as "h1") : undefined}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
      <Box
        flex="0 0 250px"
        position="relative"
        sx={{
          [theme.breakpoints.down("tablet")]: {
            flex: img_not_response ? "" : "0 0 220px",
          },
        }}
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
      </Box>
    </Stack>
  );
};

export default IntroPanel;
