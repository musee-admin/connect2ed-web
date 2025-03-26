import { useRef } from "react";

import styles from "./StackingCards.module.css";
import { motion, useScroll, useTransform } from "motion/react";
import { processAssetUrl } from "../utils";

export const StackingCards = ({ items, title, sub_heading }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.content}>
        <motion.div className={styles.header} style={{ opacity }}>
          <p className={styles.mainSubHeading}>{sub_heading}</p>
          <h2 className={styles.mainTitle}>{title}</h2>
        </motion.div>
        <div className={styles.cards}>
          {items.map((item, index) => {
            const targetScale = 1 - (items.length - index) * 0.05;
            return (
              <Card
                key={index}
                i={index}
                targetScale={targetScale}
                progress={scrollYProgress}
                range={[index * (1 / items.length), 1]}
                {...item}
              />
            );
          })}
          <div className={styles.cardContainer} />
        </div>
      </div>
    </section>
  );
};

export const Card = ({
  i,
  targetScale,
  range,
  progress,
  title,
  description,
  sub_heading,
  image,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  const y = useTransform(scale, (s) => (s - 1) * -100);

  return (
    <div
      style={{ top: `calc(10% + ${100 * i}px)` }}
      className={styles.cardContainer}
    >
      <motion.div
        style={{
          background:
            i % 2 === 0 ? "var(--secondary-color)" : "var(--tertiary-color)",
          scale,
          y,
        }}
        className={styles.cardContent}
      >
        <div className={styles.textContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardSubHeading}>{sub_heading}</p>
          <div className={styles.cardDescription}>{description}</div>
        </div>
        <div className={styles.image}>
          <img src={processAssetUrl(image)} alt="" />
        </div>
      </motion.div>
    </div>
  );
};
