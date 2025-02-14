import { useRef, useMemo } from 'react';
import styles from './Milestones.module.css';
import { useScroll, motion, useTransform, useMotionTemplate } from 'motion/react';

const milestoneItems = [
  {
    title: 'Escalation',
    description: 'Identifying and understanding the child\'s initial challenges.',
  },
  {
    title: 'Discovery',
    description: 'Getting a professional assessment and clear diagnosis',
  },
  {
    title: 'Acceptance',
    description: 'Understanding and valuing the child\'s unique qualities',
  },
  {
    title: 'Augmentation',
    description: 'Ensuring the child\'s rights and needs are fully supported',
  },
  {
    title: 'Interventions',
    description: 'Providing targeted support for learning and behavior',
  },
  {
    title: 'Adaptations',
    description: 'Creating supportive and flexible learning environments',
  },
  {
    title: 'Exemptions',
    description: 'Adjusting expectations to match the child\'s capabilities.',
  },
];

export const Milestones = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  const { scrollYProgress: scale } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
    layoutEffect: false,
  });

  const containerWidth = useMemo(() => {
    if (!containerRef.current) { return 0 }
    return containerRef.current.width;
  }, [containerRef]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(milestoneItems.length - 1) * 100}vw`]
  );


  return (
    <section ref={ref} className={styles.wrapper}>
      <motion.div style={{ scale, opacity: scale }} className={styles.content} ref={containerRef}>
        <div className={styles.header}>
          <h2>Milestones in a Neurodivergent Child's Journey</h2>
          <motion.div style={{ scaleX: scrollYProgress }} className={styles.progress} />
        </div>
        <motion.div className={styles.milestones} style={{ x }}>
          {milestoneItems.map((item, index) => (
            <MilestoneItem
              key={index}
              i={index}
              {...item}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export const MilestoneItem = ({ title, description, i }) => {
  return (
    <div
      className={styles.milestoneItem}
    >
      <div className={styles.inner}
        style={{
          background: i % 2 === 0 ? '#F59293' : '#5DB8F1',
          color: 'black'
        }}
      >
        <h3 className={styles.milestoneTitle}>{title}</h3>
        <p className={styles.milestoneDescription}>{description}</p>
      </div>
    </div>
  )
}
