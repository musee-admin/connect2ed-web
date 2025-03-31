import classNames from "classnames";
import { processAssetUrl } from "../utils";
import styles from "./TextImage.module.css";
import { motion } from "motion/react";
import { LinkButton } from "../uiComponents/Button";

export const TextImage = ({
  title,
  sub_heading,
  description,
  image,
  color,
  cta_link,
  cta_text,
}) => {
  console.log({ cta_link, cta_text });
  return (
    <motion.div className={classNames(styles.wrapper, styles[color])}>
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
          <p className={styles.subHeading}>{sub_heading}</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          {cta_text && <LinkButton href={cta_link}>{cta_text}</LinkButton>}
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
