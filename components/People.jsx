import { motion } from "motion/react";
import classNames from "classnames";
import { processAssetUrl } from "../utils";
import styles from "./People.module.css";

export const People = ({ title, sub_heading, items }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <p className={styles.subHeading}>{sub_heading}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {items.map((item, index) => (
        <Person key={index} {...item} reverseLayout={index % 2 === 1} />
      ))}
    </div>
  );
};

export const Person = ({
  tag,
  name,
  creds,
  description,
  image,
  reverseLayout,
}) => {
  return (
    <div
      className={classNames(
        styles.personWrapper,
        reverseLayout ? styles.reverseLayout : undefined,
      )}
    >
      <motion.div
        className={styles.image}
        initial={{
          x: -100,
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{ duration: 1 }}
      >
        <img src={processAssetUrl(image)} alt="" />
      </motion.div>
      <motion.div
        className={styles.textContent}
        initial={{
          x: 100,
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{ duration: 1 }}
      >
        <p className={styles.tag}>{tag}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.credentials}>{creds}</p>
        <p className={styles.description}>{description}</p>
      </motion.div>
    </div>
  );
};
