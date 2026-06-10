import styles from "./IntroColumns.module.css";
import { paragraphs } from "../utils";
import { Reveal } from "../components/Reveal";

export const IntroColumns = ({ items }) => (
  <section className="section">
    <div className={`container ${styles.grid}`}>
      {items?.map(({ title, body }, index) => (
        <Reveal key={index} delay={index * 100} className={styles.column}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.body}>{paragraphs(body)}</div>
        </Reveal>
      ))}
    </div>
  </section>
);
