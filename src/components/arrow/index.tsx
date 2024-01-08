import { useEffect, useState } from "react";

import BottomIcon from "../icons/icon_bottom.svg";
import * as styles from "./index.module.scss";

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
};

export default function Arrow({ className, direction, role }: Props) {
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
    <div className={[styles.wrapper, className].join(" ")} role={role}>
      <BottomIcon style={{ transform: `rotate(${rotate}deg)` }} />
    </div>
  );
}
