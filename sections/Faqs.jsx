import styles from "./Faqs.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { paragraphs } from "../utils";

export const Faqs = ({ eyebrow, title, description, questions }) => (
  <section className="section">
    <div className={`container ${styles.inner}`}>
      <SectionHeading eyebrow={eyebrow} title={title} lede={description} />
      <div className={styles.list}>
        {questions?.map((item, index) => (
          <Reveal key={index}>
            <details className={styles.item}>
              <summary className={styles.question}>
                {item.question}
                <span className={styles.marker} aria-hidden />
              </summary>
              <div className={styles.answer}>{paragraphs(item.answer)}</div>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
