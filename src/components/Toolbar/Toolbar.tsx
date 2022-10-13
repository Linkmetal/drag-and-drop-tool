import { Button } from "components/Button";
import styles from "./Toolbar.module.css";

type ToolbarProps = {
  onSave: () => void;
  onHelp: () => void;
};

export const Toolbar = ({ onSave, onHelp }: ToolbarProps) => {
  return (
    <div className={styles.container}>
      <Button onClick={() => onSave()} label="Save Grid" iconName="save" />
      <Button onClick={() => onHelp()} label="Help" iconName="question" />
    </div>
  );
};
