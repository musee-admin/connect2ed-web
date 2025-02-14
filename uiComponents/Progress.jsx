import { motion } from 'motion/react';
import styles from './Progress.module.css';

export const Progress = ({ progress, color = "black" }) => {
  return (
    <motion.div style={{ scaleX: progress, background: color }} className={styles.progress} />
  )
}
