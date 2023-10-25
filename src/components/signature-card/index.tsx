import { Box, Grid, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const data = [
  {
    title: "websocket_service",
    desc: "rpc",
    active: true,
  },
  {
    title: "archive_node",
    desc: "rpc",
    active: false,
  },
  {
    title: "extra_chain",
    desc: "rpc_api_graphql",
    active: false,
  },
];
function SignatureCard() {
  const { t } = useTranslation("developer_tools");
  return (
    <Grid
      container
      rowSpacing={{ laptop: "0", mobile: "16px" }}
      columnSpacing={{ laptop: "16px", mobile: "0" }}
    >
      {data.map((d, k) => (
        <Grid item laptop={4} mobile={12} key={k}>
          <Stack
            sx={{
              position: "relative",
              p: "12px 16px",
              borderRadius: "16px",
              background: "#FFF",
              boxShadow: "4px 8px 24px 0px rgba(90, 117, 255, 0.24)",
              alignItems: "center",
            }}
          >
            <Box style={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "590",
                  lineHeight: "normal",
                  letterSpacing: "-0.8px",
                  color: "#202A43",
                  textShadow: "0px 4px 24px rgba(2, 38, 225, 0.24)",
                  mb: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                {t(d.title)}
              </Typography>
              <Stack
                sx={{ flexDirection: "row", gap: "5px", alignItems: "center" }}
              >
                <img
                  style={{ width: "20px", height: "40px" }}
                  src="/images/assets/25.svg"
                  alt=""
                />
                <Box>
                  <Typography
                    sx={{
                      color: "#202A43",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                      letterSpacing: "-0.216px",
                      textWrap: "wrap",
                    }}
                  >
                    {t(d.desc)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            {d.active && (
              <Stack
                sx={{
                  position: "absolute",
                  top: "-14px",
                  right: "0",
                  flexDirection: "row",
                  padding: "2px 6px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "28.241px",
                  border:
                    "1px solid var(--gradient-fb-red-gradient-01, #EE3131)",
                  background: "#FFF",
                  gap: "4px",
                }}
              >
                <img src="/images/assets/26.svg" alt="√" />
                <Typography
                  sx={{
                    color: "#EE3131",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "590",
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.408px",
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
