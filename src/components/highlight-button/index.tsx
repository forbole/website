import * as styles from "./index.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pinkShadow?: boolean;
  size?: "big" | "normal";
};

const HighlightButton = ({ className, pinkShadow, size, ...props }: Props) => (
  <button
    {...props}
    className={[
      styles.button,
      size === "big" ? styles.big : "",
      pinkShadow ? styles.pinkShadow : "",
      className || "",
    ].join(" ")}
  />
);

export default HighlightButton;
