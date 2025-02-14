import { motion, useScroll, useTransform } from "motion/react";

import styles from './Hero.module.css';

export const Hero = ({ nextRef }) => {
  const { scrollYProgress } = useScroll({
    target: nextRef,
    offset: ["start end", "start start"],
    layoutEffect: false,
  })
  const scaleX = useTransform(scrollYProgress,
    [0, 1],
    [1, 0],
  )
  const opacity = useTransform(scrollYProgress,
    [0, 0.5, 1],
    [1, 0, 0],
  )

  return (
    <motion.div className={styles.wrapper} style={{ scaleX: scaleX, scaleY: scaleX, opacity }}>
      <div>
        <img src="logo.svg" alt="logo" />
      </div>
      <p className={styles.heroText}>
        Building Bridges for Neurodiverse Education
      </p>
    </motion.div>
  );
}
