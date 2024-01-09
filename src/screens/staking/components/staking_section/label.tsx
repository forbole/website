import type { HTMLAttributes } from "react";

import * as styles from "./label.module.scss";

type Props = HTMLAttributes<HTMLParagraphElement>;

const Label = ({ className, ...props }: Props) => (
  <span {...props} className={[styles.label, className || ""].join(" ")} />
);

export default Label;
