import * as styles from "./index.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ className, ...props }: Props) => (
  <input {...props} className={[styles.input, className].join(" ")} />
);

export default FormInput;
