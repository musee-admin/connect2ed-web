import { useState } from "react";
import styles from "./Faqs.module.css";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

export const Faqs = ({ questions, title, sub_heading }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section>
      <div className={styles.titleSection}>
        <p className={styles.subHeading}>{sub_heading}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <LayoutGroup>
        <div className={styles.wrapper}>
          {questions.map((q, i) => (
            <>
              <Accordion
                key={i}
                i={i}
                expanded={expanded}
                setExpanded={setExpanded}
                title={q.question}
                description={q.answer}
              />
              <hr className={styles.hr} />
            </>
          ))}
        </div>
      </LayoutGroup>
    </section>
  )
};

const Accordion = ({ i, expanded, setExpanded, title, description }) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.div
        className={styles.itemQuestion}
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        style={{
        }}
      >
        Q{i + 1}: {title}
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            layout
            className={styles.itemAnswer}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            A: {description}
          </motion.section>
        )}
      </AnimatePresence >
    </>
  );
};

export default Accordion;
