import { motion, useScroll, useTransform } from 'motion/react';
import styles from './Footer.module.css';
import { useRef } from 'react';

export const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 70vh']
  });

  const y = useTransform(scrollYProgress,
    [0.9, 1],
    ['15vh', '3vh']
  )


  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="logo-white.svg" alt="logo" />
        </div>
        <div className={styles.separator} />
        <div className={styles.links}>
          <a href=''>Terms</a>
          <a href=''>Privacy Policy</a>
        </div>
      </div>
      <motion.div className={styles.hangingContent} style={{ opacity: scrollYProgress, bottom: y }}>
        For any enquiries or feedback contact us at <a href='mailto:enquiry@connec2ed.com'>enquiry@connec2ed.com</a>
      </motion.div>
    </section >
  )
}
