import { Stack, Typography, useTheme } from "@mui/material";
import dynamic from "next/dynamic";

const Trans = dynamic(async () => import("next-translate/Trans"), {
  ssr: false,
});

type Props = {
  desc?: string;
  maxWidth?: string;
  title?: string;
  title_large?: string;
  title_large_trans?: string;
};

// Rename the component so the i18next parser doesn't try to parse it
const Translate = Trans;

const Section = ({
  maxWidth = "laptop",
  title,
  desc,
  title_large,
  title_large_trans,
}: Props) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        maxWidth,
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "24px",
        color: "#202A43",
        textShadow:
          "0px 14px 64px  rgba(2, 38, 225, 0.12), 0px 8px 22px  rgba(2, 38, 225, 0.12)",
      }}
    >
      {title && (
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            gap: "24px",
            color: "#202A43",
            [theme.breakpoints.down("laptop")]: {
              fontWeight: "590",
              fontSize: "16px",
            },
          }}
        >
          {title}
        </Typography>
      )}
      {title_large && (
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: "590",
            color: "#202A43",
            [theme.breakpoints.down("laptop")]: {
              fontWeight: "700",
              fontSize: "24px",
            },
          }}
        >
          {title_large}
        </Typography>
      )}

      {title_large_trans && (
        <Translate
          components={[
            <Typography
              display="inline"
              sx={{
                fontSize: "40px",
                fontWeight: "590",
                color: "#202A43",
                [theme.breakpoints.down("laptop")]: {
                  fontWeight: "700",
                  fontSize: "24px",
                },
              }}
            />,
            <Typography
              color="#EE3131"
              component="span"
              display="inline"
              sx={{
                textShadow: "0px 0px 20px #ffffff",
                fontSize: "40px",
                fontWeight: "590",
                [theme.breakpoints.down("laptop")]: {
                  fontWeight: "700",
                  fontSize: "24px",
                },
              }}
            />,
          ]}
          i18nKey={title_large_trans}
        />
      )}

      {desc && (
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "400",
            color: "#202A43",
            [theme.breakpoints.down("laptop")]: {
              fontSize: "16px",
            },
          }}
        >
          {desc}
        </Typography>
      )}
    </Stack>
  );
};

export default Section;
