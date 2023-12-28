import { Stack, useTheme } from "@mui/material";

import { Stats } from "./components";

const KeyData = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        alignItems: "center",
        flex: "1",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "0 auto",
        [theme.breakpoints.down("laptop")]: {
          flexDirection: "column",
          gap: "24px",
        },
        [theme.breakpoints.up("laptop")]: {
          flexDirection: "row",
          gap: "24px",
        },
      }}
    >
      <Stats />
    </Stack>
  );
};

export default KeyData;
