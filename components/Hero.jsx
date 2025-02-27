import { motion, useScroll, useTransform } from "motion/react";

import styles from './Hero.module.css';
import { useParticles } from "../providers/ParticlesProvider";
import Particles from "@tsparticles/react";
import { particlesConfig } from "../constants/particlesConfig";

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

  const { init } = useParticles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.particles}>
        <Particles
          init={init}
          id="heroParticles"
          options={particlesConfig}
        />
      </div>
      <motion.div className={styles.contentWrapper} style={{ scaleX: scaleX, scaleY: scaleX, opacity }}>
        <div>
          <img src="logo.svg" alt="logo" />
        </div>
        <p className={styles.heroText}>
          Building Bridges for Neurodiverse Education
        </p>
      </motion.div>
    </div>
  );
}
