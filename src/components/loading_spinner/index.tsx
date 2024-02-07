import IconSpinner from "@src/components/icons/icon_spinner.svg";

import * as styles from "./index.module.scss";

type Props = {
  className?: string;
};

const LoadingSpinner = ({ className }: Props) => (
  <span className={[styles.wrapper, className || ""].join(" ")}>
    <IconSpinner />
  </span>
);

export default LoadingSpinner;
