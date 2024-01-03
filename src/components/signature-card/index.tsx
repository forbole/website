import { Box, Grid, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

function SignatureCard() {
  const { t } = useTranslation("developer_tools");

  const data = useMemo(
    () => [
      {
        active: true,
        desc: t("rpc"),
        title: t("websocket_service"),
      },
      {
        active: false,
        desc: t("rpc"),
        title: t("archive_node"),
      },
      {
        active: false,
        desc: t("rpc_api_graphql"),
        title: t("extra_chain"),
      },
    ],
    [t],
  );

  return (
    <Grid
      columnSpacing={{ laptop: "16px", mobile: "0" }}
      container
      rowSpacing={{ laptop: "0", mobile: "16px" }}
    >
      {data.map((d, k) => (
        <Grid item key={k} laptop={4} mobile={12}>
          <Stack
            sx={{
              alignItems: "center",
              background: "#FFF",
              borderRadius: "16px",
              boxShadow: "4px 8px 24px 0px rgba(90, 117, 255, 0.24)",
              p: "12px 16px",
              position: "relative",
            }}
          >
            <Box style={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "#202A43",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "590",
                  letterSpacing: "-0.8px",
                  lineHeight: "normal",
                  mb: "8px",
                  textShadow: "0px 4px 24px rgba(2, 38, 225, 0.24)",
                  whiteSpace: "nowrap",
                }}
              >
                {d.title}
              </Typography>
              <Stack
                sx={{ alignItems: "center", flexDirection: "row", gap: "5px" }}
              >
                <img
                  alt=""
                  src="/images/assets/25.svg"
                  style={{ height: "40px", width: "20px" }}
                />
                <Box>
                  <Typography
                    sx={{
                      color: "#202A43",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      letterSpacing: "-0.216px",
                      lineHeight: "16px",
                      textWrap: "wrap",
                    }}
                  >
                    {d.desc}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            {d.active && (
              <Stack
                sx={{
                  alignItems: "center",
                  background: "#FFF",
                  border:
                    "1px solid var(--gradient-fb-red-gradient-01, #EE3131)",
                  borderRadius: "28.241px",
                  flexDirection: "row",
                  gap: "4px",
                  justifyContent: "center",
                  padding: "2px 6px",
                  position: "absolute",
                  right: "0",
                  top: "-14px",
                }}
              >
                <img alt="√" src="/images/assets/26.svg" />
                <Typography
                  sx={{
                    color: "#EE3131",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "590",
                    letterSpacing: "-0.408px",
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("unlimited_usage")}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default SignatureCard;
