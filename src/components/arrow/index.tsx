import type { SxProps, Theme } from "@mui/material";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { BottomIcon } from "../icons";

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

type Props = {
  className: string;
  direction?: Direction;
  role?: string;
  sx?: SxProps<Theme>;
};

export default function Arraw({ className, direction, role, sx }: Props) {
  const theme = useTheme();
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    function movePlayer() {
      if (direction === Direction.Up) {
        setRotate(180);
      } else if (direction === Direction.Down) {
        setRotate(0);
      } else if (direction === Direction.Left) {
        setRotate(90);
      } else if (direction === Direction.Right) {
        setRotate(-90);
      } else {
        setRotate(90);
      }
    }

    movePlayer();
  }, [direction]);

  return (
    <Box
      className={className}
      role={role}
      sx={{
        "& svg": {
          "& path": {
            stroke: theme.palette.custom.forbole.blue,
          },
          "fill": " #FFF",
          "filter":
            "drop-shadow(0px 14px 64px rgba(2, 38, 225, 0.12)) drop-shadow(0px 8px 22px rgba(2, 38, 225, 0.12))",
          "transition": "fill 0.3s",
        },
        "cursor": "pointer",
        "display": "flex",
        "height": "48px",
        [theme.breakpoints.down("laptop")]: {
          height: "36px",
          width: "36px",
        },
        "userSelect": "none",
        "width": "48px",
        ...sx,
      }}
      zIndex={2}
    >
      <BottomIcon style={{ transform: `rotate(${rotate}deg)` }} />
    </Box>
  );
}
