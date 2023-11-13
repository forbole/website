/* eslint-disable no-nested-ternary */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

const HowToCard = (props: any) => {
  const { t } = useTranslation("staking");
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const { id, image, title, desc } = props;
  return (
    <Box
      sx={{
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "flex-start",
        "padding": theme.spacing(4, 3),
        "background": theme.palette.common.white,
        "borderRadius": theme.spacing(3),
        "boxShadow":
          "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
        "& span": {
          marginLeft:
            id <= 2
              ? ("-19px !important" as any)
              : id === 3
                ? ("-15px !important" as any)
                : ("-5px !important" as any),
          maxWidth: "150% !important" as any,
        },
      }}
    >
      {image && (
        <Image height="60px" objectFit="contain" src={image} width="100%" />
      )}
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Typography
          color={theme.palette.custom.forbole.blue}
          fontWeight={600}
          sx={{
            padding: theme.spacing(5.75, 0, 3, 0),
            fontSize: theme.spacing(2.25),
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(2.5),
              padding: theme.spacing(2.5, 0),
            },
          }}
          variant="h4"
        >
          {t(title)}
        </Typography>
        <Typography
          color={theme.palette.custom.forbole.blue}
          fontSize={onlyLargeScreen ? theme.spacing(2) : theme.spacing(1.75)}
          sx={{
            textAlign: "start",
            lineHeight: theme.spacing(2.5),
            [theme.breakpoints.up("laptop")]: {
              lineHeight: theme.spacing(3),
            },
          }}
          variant="body1"
        >
          {t(desc)}
        </Typography>
      </Box>
    </Box>
  );
};

export default HowToCard;
