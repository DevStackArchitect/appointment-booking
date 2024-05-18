import React, { FC } from "react";
import styles from "./styles.module.scss";
interface Props {
  children: React.ReactNode;
  clicked?: () => void;
  hasArrow?: boolean;
}
const PrimaryButton: FC<Props> = ({ children, clicked, hasArrow = false }) => {
  return (
    <button onClick={clicked} className={styles.wrapper}>
      {children}{" "}
      {hasArrow && (
        <img
          src="/images/chevron-right-green.svg"
          alt=""
          className={styles.arrow}
        />
      )}
    </button>
  );
};
export default PrimaryButton;
