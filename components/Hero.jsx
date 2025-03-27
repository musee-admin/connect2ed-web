import styles from "./Hero.module.css";
import { motion, useScroll, useTransform } from "motion/react";
import { getCssUrl, processString } from "../utils";
import { LinkButton } from "../uiComponents/Button";
import classNames from "classnames";
import { useRef } from "react";

export const Hero = ({
  title,
  description,
  hero_image,
  cta_text,
  cta_link,
  left_title,
  left_description,
  right_title,
  right_description,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const leftOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [0, 0, 1, 1],
  );

  const rightOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0, 0, 1, 1],
  );
  return (
    <section className={styles.wrapper} ref={ref}>
      <motion.div
        className={styles.primaryWrapper}
        style={{ backgroundImage: getCssUrl(hero_image) }}
      >
        <motion.div className={styles.contentWrapper}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{processString(description)}</div>
          {cta_text && <LinkButton>{cta_text}</LinkButton>}
        </motion.div>
        <div className={styles.extraSections}>
          <motion.div
            className={styles.leftSectionWrapper}
            style={{ opacity: leftOpacity }}
          >
            <div
              className={classNames(styles.otherSection, styles.leftSection)}
            >
              <h3>{left_title}</h3>
              <p>{processString(left_description)}</p>
            </div>
          </motion.div>
          <motion.div
            className={styles.rightSectionWrapper}
            style={{ opacity: rightOpacity }}
          >
            <div
              className={classNames(styles.otherSection, styles.rightSection)}
            >
              <h3>{right_title}</h3>
              <p>{processString(right_description)}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
