import React, { useEffect, useState } from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { BottomIcon } from "../icons";
export enum Direction {
  Up,
  Down,
  Left,
  Right,
}
type Props = {
  className: string;
  sx?: SxProps<Theme>;
  direction?: Direction;
};

export default function Arraw({ className, sx, direction }: Props) {
  const theme = useTheme();
  const [rotate, setRotate] = useState(0);
  function movePlayer(direction: Direction|undefined) {
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
  useEffect(() => {
    movePlayer(direction);
  }, []);
  return (
    <Box
      className={className}
      zIndex={2}
      sx={{
        userSelect:"none",
        display:'flex',
        width: "48px",
        height: "48px",
        [theme.breakpoints.down("laptop")]: {
          width: "36px",
          height: "36px",
        },
        cursor: "pointer",
        "& svg": {
          transition: "fill 0.3s",
          filter:
            "drop-shadow(0px 14px 64px rgba(2, 38, 225, 0.12)) drop-shadow(0px 8px 22px rgba(2, 38, 225, 0.12))",
          fill: " #FFF",
          "& path": {
            stroke: theme.palette.custom.forbole.blue,
          },
          // "&:hover circle": {
          //   fill: "rgba(255, 255, 255,.7)",
          // },
        },
        ...sx,
      }}
    >
      <BottomIcon
      style={{ transform: "rotate(" + rotate + "deg)" }} 
      />
    </Box>
  );
}