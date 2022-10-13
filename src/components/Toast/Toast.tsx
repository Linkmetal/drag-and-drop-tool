import { Button } from "components/Button";
import styles from "./Toast.module.css";
import { useToastMessageContext } from "contexts/ToastContext";

export type ToastVariant = "success" | "error";

export type ToastProps = {
  title: string;
  description: string;
  variant?: ToastVariant;
};

export const Toast = ({
  title,
  description,
  variant = "success",
}: ToastProps) => {
  const { setToastMessage } = useToastMessageContext();

  const onClose = () => setToastMessage(null);

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <div className={styles.closeButton}>
        <Button
          label="Close toast notification"
          onlyIcon
          onClick={onClose}
          iconName="close"
          color="transparent"
          textColor="black"
          noShadow
        />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

Toast.displayName = "Toast";
