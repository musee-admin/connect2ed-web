import { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";

import styles from './Support.module.css';
import { Progress } from '../uiComponents/Progress';

const variants = {
  enter: (direction) => {
    return {
      opacity: 0,
    };
  },
  center: {
    opacity: 1,
  },
  exit: (direction) => {
    return {
      opacity: 0,
    };
  }
};

const descVariants = {
  enter: (direction) => {
    return {
      y: direction === 'down' ? -200 : 200,
      opacity: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      y: direction === 'down' ? 200 : -200,
      opacity: 0,
    };
  }
};

const slideContent = [
  {
    title: 'Prevalence of Learning Challenges',
    description: '5-15% of school going children experience specific Learning Disabilities, presenting a critical educational challenge.'
  },
  {
    title: 'Teacher Awareness Gap',
    description: 'The high lack of awareness among teachers about learning disabilities significantly impacts student support.'
  },
  {
    title: 'Critical Intervention Window',
    description: 'Early identification and intervention during the formative years (up to age 10) are absolutely crucial for a child\'s development trajectory.'
  },
]

export const Support = ({ ref }) => {
  const [direction, setDirection] = useState('up')
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const diff = latest - scrollYProgress.getPrevious();
    setDirection(diff > 0 ? 'down' : 'up');
    const itemCount = slideContent.length + 2;
    const singleItemPercentage = 1 / itemCount;
    const activeSlideN = Math.floor(latest / singleItemPercentage) - 1;
    setActiveSlide(activeSlideN);
  });

  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>Supporting Neurodivergent Children</h2>
          <Progress progress={scrollYProgress} color="var(--secondary-color)" />
        </div>
        <div className={styles.items}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`slide-${activeSlide}`}
              className={styles.slide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 10, damping: 10 },
                opacity: { duration: 0.2 }
              }}
            >
              {slideContent[activeSlide]?.title || "\u00A0"}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${activeSlide}`}
              className={styles.slideContent}
              variants={descVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", bounce: 0.5 },
                opacity: { duration: 0.2 }
              }}
            >
              {slideContent[activeSlide]?.description || "\u00A0"}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
