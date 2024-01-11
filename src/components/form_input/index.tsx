import * as styles from "./index.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  classNameWrapper?: string;
  noMargin?: boolean;
  rightText?: string;
};

const FormInput = ({ className, noMargin, rightText, ...props }: Props) => {
  const input = (
    <input
      {...props}
      className={[
        styles.input,
        rightText ? styles.withText : "",
        noMargin ? styles.noMargin : "",
        className,
      ].join(" ")}
    />
  );

  if (!rightText) return input;

  return (
    <span className={styles.wrapper}>
      {input}
      {!!rightText && <span className={styles.rightText}>{rightText}</span>}
    </span>
  );
};

export default FormInput;
