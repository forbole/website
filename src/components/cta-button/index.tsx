import type { ButtonHTMLAttributes } from "react";

import * as styles from "./index.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function CtaButton({
  disabled,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[styles.button, props.className].join(" ")}
      disabled={disabled || loading}
    />
  );
}
