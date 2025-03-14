import styles from "./Button.module.css";

export const Button = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({ children, ...props }) => {
  return (
    <a className={styles.button} {...props}>
      {children}
    </a>
  );
};
