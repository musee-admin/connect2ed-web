import styles from "./StatCallout.module.css";
import { Reveal } from "../components/Reveal";
import { paragraphs } from "../utils";

export const StatCallout = ({ eyebrow, title, description, stat_value, stat_label }) => (
  <section className={`section ${styles.section}`}>
    <div className={`container ${styles.grid}`}>
      {stat_value && (
        <Reveal className={styles.statBlock}>
          <p className={styles.statValue}>{stat_value}</p>
          {stat_label && <p className={styles.statLabel}>{stat_label}</p>}
        </Reveal>
      )}
      <Reveal delay={100} className={styles.content}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{paragraphs(description)}</div>
      </Reveal>
    </div>
  </section>
);
