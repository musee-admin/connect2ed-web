import styles from "./Hero.module.css";
import { motion } from "motion/react";
import { getCssUrl } from "../utils";
import { LinkButton } from "../uiComponents/Button";

export const Hero = ({ title, description, hero_image, cta_text, cta_link }) => {
  return (
    <motion.section
      className={styles.wrapper}
      style={{ backgroundImage: getCssUrl(hero_image) }}
    >
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, x: "30%", y: "-200%" }}
        whileInView={{ opacity: 1, x: "30%", y: "-150%" }}
        transition={{ duration: 1 }}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <LinkButton>{cta_text}</LinkButton>
      </motion.div>
    </motion.section>
  )
}
