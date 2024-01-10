import IconSpinner from "@src/components/icons/icon_spinner.svg";

import * as styles from "./index.module.scss";

const LoadingSpinner = () => (
  <span className={styles.wrapper}>
    <IconSpinner />
  </span>
);

export default LoadingSpinner;
