import { Button } from "components/Button";
import styles from "./Modal.module.css";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
};

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className={`${styles.container}`}>
      <div className={styles.closeButton}>
        <Button
          label="Close modal"
          onlyIcon
          onClick={onClose}
          iconName="close"
          color="white"
          textColor="black"
          noShadow
        />
      </div>

      <div className={styles.textContainer}>{children}</div>
    </div>
  );
};

Modal.displayName = "Modal";
