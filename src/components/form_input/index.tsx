import * as styles from "./index.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

const FormInput = ({ className, fullWidth, ...props }: Props) => (
  <input
    {...props}
    className={[
      styles.input,
      fullWidth ? styles.fullWidth : "",
      className,
    ].join(" ")}
  />
);

export default FormInput;
