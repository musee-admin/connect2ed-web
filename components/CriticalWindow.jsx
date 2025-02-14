import { useRef } from 'react';

import styles from './CriticalWindow.module.css';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Progress } from '../uiComponents/Progress';

const items = [
  {
    title: 'Scale of Variation',
    description: '12% of children experience developmental variations, demanding innovative tracking.',
    fg: '',
    bg: '#00B0B8',
  },
  {
    title: 'Pivotal Development Period',
    description: 'The first 8 years are crucial for idenifying and supporting neurodivergent children.',
    bg: '#253F6D',
    fg: '',
  },
  {
    title: 'Fragmented Support',
    description: 'Professionals Struggle to collaborate and provide comprehensive support.',
    bg: '#00B0B8',
    fg: '',
  },
  {
    title: 'Outdated Tracking',
    description: 'Current information systems are fragmented and inefficient.',
    bg: '#253F6D',
    fg: '',
  },
]

export const CriticalWindow = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 10,
    mass: 1,
  });

  const headerProgress = useTransform(scrollYProgress,
    [0, 0.9, 1],
    [1, 1, 0],
  )

  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.content}>
        <motion.div className={styles.header} style={{ opacity: headerProgress }}>
          <h2>Critical window of opportunity</h2>
          <Progress progress={scrollYProgress} />
        </motion.div>
        <div className={styles.cards}>
          {items.map((item, index) => {
            const targetScale = 1 - ((items.length - index) * 0.05);
            return (
              <Card
                key={index}
                i={index}
                targetScale={targetScale}
                progress={progress}
                range={[index * (1 / items.length), 1]}
                {...item}
              />
            )
          })}
          <div className={styles.cardContainer} />
        </div>
      </div>
    </section>
  )
}

export const Card = ({
  i,
  targetScale,
  range,
  progress,
  title,
  description,
  bg,
  fg
}) => {

  const scale = useTransform(progress, range, [1, targetScale]);
  const scaleLast = useTransform(
    progress,
    [0, 0.95, 1],
    [1, 1, 3]
  );
  const opacity = useTransform(
    progress,
    [0, 0.9, 1],
    [1, 1, 0]
  );

  const y = useTransform(scaleLast, (s) => (s - 1) * -100)

  const scaleFinal = useTransform([scale, scaleLast], ([s1, s2]) => s2 > 1 ? s2 * s1 : s1);

  return (
    <div style={{ top: `calc(20% + ${100 * i}px)` }} className={styles.cardContainer}>
      <motion.div style={{ background: bg, scale: scaleFinal, y }} className={styles.cardContent}>
        <motion.h3 style={{ opacity }} className={styles.cardTitle}>{title}</motion.h3>
        <motion.div style={{ opacity }} className={styles.cardDescription}>{description}</motion.div>
      </motion.div>
    </div>
  )

}
