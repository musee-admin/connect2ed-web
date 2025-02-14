import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import styles from './Mission.module.css';
import { useRef } from 'react';
import classNames from 'classnames';

export const Mission = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  })

  const mainTextOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    [1, 0]
  )

  const logoOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    [0, 1]
  )

  const middleScale = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    [600, 150]
  )

  const lineScale = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    [0, 1]
  )

  const statementPos = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    [2000, 0]
  )

  const negativeStatementPos = useTransform(statementPos, s => -s);

  const middleTemplate = useMotionTemplate`1fr ${middleScale}px 1fr`;
  return (
    <section ref={ref} className={styles.wrapper}>
      <motion.div
        className={styles.content}
        layout
        style={{
          gridTemplateColumns: middleTemplate,
          gridTemplateRows: middleTemplate,
        }}
      >
        <div className={styles.main}>
          <motion.div className={styles.mainText} style={{ opacity: mainTextOpacity }}>
            <h2 className={styles.title}>
              Our Mission
            </h2>
            <p className={styles.mainStatement}>
              Empower every education institution to support neurodivergent children through Personalised,
              Collaborative support that unlocks their unique potential.
            </p>
          </motion.div>
          <motion.div className={styles.logo} style={{ opacity: logoOpacity }}>
            <img src="logo.svg" alt="logo" />
          </motion.div>
          <motion.div className={classNames(styles.statementLine, styles.statement1Line)} style={{ scaleY: lineScale, originY: "100%" }} />
          <motion.div className={classNames(styles.statementLine, styles.statement2Line)} style={{ scaleX: lineScale, originX: 0 }} />
          <motion.div className={classNames(styles.statementLine, styles.statement3Line)} style={{ scaleY: lineScale, originY: 0 }} />
          <motion.div className={classNames(styles.statementLine, styles.statement4Line)} style={{ scaleX: lineScale, originX: "100%" }} />
        </div>

        <motion.div
          style={{ x: statementPos, opacity: logoOpacity }}
          className={classNames(styles.statement, styles.statement1)}
        >
          <h3>Multidisciplinary Collaboration</h3>
          <p>Expert interdisciplinary teams addressing complex learning needs</p>
        </motion.div>

        <motion.div
          style={{ y: statementPos, opacity: logoOpacity }}
          className={classNames(styles.statement, styles.statement2)}
        >
          <h3>Family-Professional Partnership</h3>
          <p>Integrated support strategies co-created by families and professionals</p>
        </motion.div>

        <motion.div
          style={{ x: negativeStatementPos, opacity: logoOpacity }}
          className={classNames(styles.statement, styles.statement3)}
        >
          <h3>Adaptive Learning Environments</h3>
          <p>Customised learning spaces that amplify individual strengths</p>
        </motion.div>

        <motion.div
          style={{ y: negativeStatementPos, opacity: logoOpacity }}
          className={classNames(styles.statement, styles.statement4)}
        >
          <h3>Targeted Developmental Support</h3>
          <p>Dynamic, responsive interventions tailored to each child's journey</p>
        </motion.div>

      </motion.div>
    </section>
  )
}
