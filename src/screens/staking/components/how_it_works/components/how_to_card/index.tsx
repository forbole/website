/* eslint-disable no-nested-ternary */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/legacy/image";

const HowToCard = ({ desc, id, image, title }: any) => {
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));

  return (
    <Box
      sx={{
        "& span": {
          marginLeft:
            id <= 2
              ? ("-19px !important" as any)
              : id === 3
                ? ("-15px !important" as any)
                : ("-5px !important" as any),
          maxWidth: "150% !important" as any,
        },
        "alignItems": "flex-start",
        "background": theme.palette.common.white,
        "borderRadius": theme.spacing(3),
        "boxShadow":
          "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
        "display": "flex",
        "flexDirection": "column",
        "padding": theme.spacing(4, 3),
      }}
    >
      <Box
        sx={{
          marginLeft: theme.spacing(2),
        }}
      >
        {image && (
          <Image
            alt=""
            height="60"
            objectFit="contain"
            src={image}
            width="70"
          />
        )}
      </Box>
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
            fontSize: theme.spacing(2.25),
            padding: theme.spacing(5.75, 0, 3, 0),
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(2.5),
              padding: theme.spacing(2.5, 0),
            },
          }}
          variant="h4"
        >
          {title}
        </Typography>
        <Typography
          color={theme.palette.custom.forbole.blue}
          fontSize={onlyLargeScreen ? theme.spacing(2) : theme.spacing(1.75)}
          sx={{
            lineHeight: theme.spacing(2.5),
            textAlign: "start",
            [theme.breakpoints.up("laptop")]: {
              lineHeight: theme.spacing(3),
            },
          }}
          variant="body1"
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default HowToCard;
