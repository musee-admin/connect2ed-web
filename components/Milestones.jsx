import { useRef, useMemo } from 'react';
import styles from './Milestones.module.css';
import { useScroll, motion, useTransform, useMotionTemplate } from 'motion/react';
import { Progress } from '../uiComponents/Progress';
import { Swiggly } from '../uiComponents/Swiggly';

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

  const progressArray = milestoneItems.reduce((acc, _, index) => {
    if (index === 0) {
      return [0];
    }
    if (index === milestoneItems.length - 1) {
    }
    const unitPos = 1 / ((milestoneItems.length - 1) * 3);
    const pos = index / (milestoneItems.length - 1);
    return [...acc, pos - (unitPos * 2), pos - unitPos, pos];
  }, []);

  const rangeArray = milestoneItems.reduce((acc, _, index) => {
    if (index === 0) {
      return ['0vw'];
    }
    const translate = index * 100;
    if (index === milestoneItems.length - 1) {
      return [...acc, `-${translate - 20}vw`, `-${translate - 10}vw`, `-${translate}vw`];
    }
    return [...acc, `-${translate - 10}vw`, `-${translate}vw`, `-${translate + 10}vw`];
  }, []);


  const x = useTransform(
    scrollYProgress,
    progressArray,
    rangeArray
  );


  return (
    <section ref={ref} className={styles.wrapper}>
      <motion.div style={{ scale, opacity: scale }} className={styles.content} ref={containerRef}>
        <div className={styles.header}>
          <h2>Milestones in a Neurodivergent Child's Journey</h2>
          <Progress progress={scrollYProgress} color="#F5C261" />
        </div>
        <motion.div className={styles.milestones} style={{ x }}>
          <div className={styles.hr} style={{ width: `${(milestoneItems.length - 1) * 100}vw` }}>
            <Swiggly progress={scrollYProgress} />
          </div>
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
