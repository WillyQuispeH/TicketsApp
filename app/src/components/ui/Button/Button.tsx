import Loader from "../Loader";
import styles from "./Button.module.scss";

interface IntButton {
  onClick?: any;
  background?: string;
  disabled?: boolean;
  isLoading?: boolean;
  valor: string;
  width: string;
  height: string;
}
const Button = ({
  onClick,
  valor,
  width,
  height,
  background,
  disabled,
  isLoading,
}: IntButton) => {
  return (
    <div className={styles.button} style={{ width, height }}>
      <button onClick={onClick} disabled={disabled} style={{ background }}>
        {isLoading ? <Loader width={height} height={height} /> : valor}
      </button>
    </div>
  );
};
export default Button;
