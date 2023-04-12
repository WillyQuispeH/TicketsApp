
import styles from "./InputText.module.scss";

interface IntInputText {
  place?: string;
  name?: string;
  onBlur?: any;
  onFocus?: any;
  isValid?: boolean;
  onChange: any;
  type: string;
  label: string;
  width: string;
  value: string;
  maxLength?: number;
}

const InputText = ({
  type,
  label,
  place,
  name,
  width,
  value,
  maxLength,
  onChange,
  onBlur,
  onFocus,
  isValid = true,
}: IntInputText) => {
  return (
    <div className={styles.inputText} style={{ width }}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={place}
        value={value}
        onChange={onChange}
        name={name}
        style={{ background: isValid ? "none" : "rgb(255 0 0 / 10%)" }}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputText;
