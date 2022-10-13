import { Icon } from "components/Icon";
import styles from "./Button.module.css";

type IconProps = {
  label: string;
  onlyIcon?: boolean;
  noShadow?: boolean;
  iconName?: string;
  color?: string;
  textColor?: string;
  onClick: () => void;
};

export const Button = ({
  iconName,
  onClick,
  label,
  onlyIcon = false,
  noShadow = false,
  color = "#475abe",
  textColor = "#fff",
}: IconProps) => (
  <div className={`${styles.container}`}>
    <button
      onMouseDown={onClick}
      className={`${styles.button} ${onlyIcon ? styles.onlyIcon : ""}  ${
        noShadow ? styles.noShadow : ""
      }`}
      aria-label={label}
      style={{ backgroundColor: color, color: textColor }}
    >
      {iconName && <Icon name={iconName} />}
      {!onlyIcon && <span>{label}</span>}
    </button>
  </div>
);

export default Button;
