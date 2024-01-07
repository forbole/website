import * as styles from "./index.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const HighlightButton = ({ className, ...props }: Props) => (
  <button {...props} className={[styles.button, className || ""].join(" ")} />
);

export default HighlightButton;
