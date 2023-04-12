import styles from "./ButtonIcon.module.scss";

interface IntButtonIcon {
  onClick?: any;
  icon: string;
  typeButton: "circle" | "square";
  data?:any
}

const ButtonIcon = ({ onClick, icon, typeButton }: IntButtonIcon) => {
  return (
    <div className={styles[typeButton]}>
      <span className="material-symbols-outlined" onClick={onClick}>
        {icon}
      </span>
    </div>
  );
};

export default ButtonIcon;
