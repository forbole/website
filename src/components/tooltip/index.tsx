import { Tooltip as TooltipBase } from "react-tooltip";

import * as styles from "./index.module.scss";

export const tooltipId = "app-tooltip";

const Tooltip = () => <TooltipBase className={styles.main} id={tooltipId} />;

export default Tooltip;
