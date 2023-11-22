import { Stack, useTheme } from "@mui/material";

import { Stats } from "./components";

const KeyData = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        flex: "1",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
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
