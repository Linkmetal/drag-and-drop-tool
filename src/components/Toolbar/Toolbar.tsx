import styles from "./Toolbar.module.css";

type ToolbarProps = {
  onSave: () => void;
  onHelp: () => void;
};

export const Toolbar = ({ onSave, onHelp }: ToolbarProps) => {
  return (
    <div className={styles.container}>
      <button onClick={() => onSave()}>Save Grid</button>
      <button onClick={() => onHelp()}>Help</button>
    </div>
  );
};
