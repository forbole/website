import type { ReactNode } from "react";

import * as styles from "./index.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  classNameWrapper?: string;
  fullWidth?: boolean;
  noMargin?: boolean;
  rightText?: ReactNode;
};

const FormInput = ({
  className,
  classNameWrapper,
  fullWidth,
  noMargin,
  rightText,
  ...props
}: Props) => {
  const input = (
    <input
      {...props}
      className={[
        styles.input,
        rightText ? styles.withText : "",
        fullWidth ? styles.fullWidth : "",
        noMargin ? styles.noMargin : "",
        className,
      ].join(" ")}
    />
  );

  if (!rightText) return input;

  return (
    <span className={[styles.wrapper, classNameWrapper || ""].join(" ")}>
      {input}
      {!!rightText && <span className={styles.rightText}>{rightText}</span>}
    </span>
  );
};

export default FormInput;
