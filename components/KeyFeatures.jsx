import styles from './KeyFeatures.module.css';
import { Progress } from '../uiComponents/Progress';
import { useScroll, motion, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';


const features = [
  {
    title: 'Personalized User Journeys',
    description: 'Track individual experiences and collect specific information for each user'
  },
  {
    title: 'Intuitive Dashboards',
    description: 'Quick overview of key information to support fast decision-making'
  },
  {
    title: 'Collaborative Workflows',
    description: 'Enable seamless communication between different professionals like therapists and educators'
  },
  {
    title: 'Multi-Mode Observation',
    description: 'Capture important trigger events to inform intervention strategies'
  },
  {
    title: 'Standardized Checklists',
    description: 'Reduce subjective assessments with pre-configured evaluation tools'
  },
  {
    title: 'Flexible Education Plans',
    description: 'Create adaptable learning plans with easy session scheduling and reporting'
  },
  {
    title: 'Strategic Insights',
    description: 'Provide school administrators with comprehensive data for informed decisions'
  },



]

export const KeyFeatures = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  })
  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Key Features</h2>
          <Progress progress={scrollYProgress} color="black" />
        </div>
        <div className={styles.features}>
          {features.map((f, i) => {
            const range = [(i / features.length), (i + 0.7) / features.length, (i + 1) / features.length];
            return (
              <FeatureItem progress={scrollYProgress} i={i} range={range} {...f} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export const FeatureItem = ({ progress, range, i, title, description }) => {
  const x = useTransform(progress, range, [400, -20, 0]);
  const opacity = useTransform(progress, range, [0, 0.9, 1]);
  return (
    <motion.div className={styles.feature} style={{ y: x, opacity }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}
