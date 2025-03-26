import { processAssetUrl } from "../utils";
import styles from "./TextImage.module.css";
import { motion } from "motion/react";

export const TextImage = ({ title, sub_heading, description, image }) => {
  return (
    <motion.div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <motion.div
          className={styles.textContainer}
          initial={{
            x: 50,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 1 }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subHeading}>{sub_heading}</p>
          <p className={styles.description}>{description}</p>
        </motion.div>
        <motion.div
          className={styles.imageContainer}
          initial={{
            x: -50,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{ duration: 1 }}
        >
          <img src={processAssetUrl(image)} alt="application" />
        </motion.div>
      </div>
    </motion.div>
  );
};
