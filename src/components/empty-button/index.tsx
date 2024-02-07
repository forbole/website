import * as styles from "./index.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  withoutBorder?: boolean;
};

const EmptyButton = ({ className, withoutBorder, ...props }: Props) => (
  <button
    {...props}
    className={[
      styles.button,
      withoutBorder ? styles.withoutBorder : "",
      className || "",
    ].join(" ")}
  />
);

export default EmptyButton;
