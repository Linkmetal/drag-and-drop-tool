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
      <button
        className={styles.closeButton}
        aria-label="Close toast notification"
        onClick={onClose}
      >
        X
      </button>

      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

Toast.displayName = "Toast";
