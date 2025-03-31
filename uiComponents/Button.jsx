import classNames from "classnames";
import styles from "./Button.module.css";

export const Button = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({ children, className, ...props }) => {
  return (
    <a className={classNames(styles.button, className)} {...props}>
      {children}
    </a>
  );
};
