import styles from "./SectionHeading.module.css";
import { Reveal } from "./Reveal";

export const SectionHeading = ({ eyebrow, title, lede, align = "left", onDark = false }) => {
  if (!eyebrow && !title && !lede) {
    return null;
  }
  return (
    <Reveal>
      <header
        className={`${styles.heading} ${align === "center" ? styles.center : ""} ${onDark ? styles.onDark : ""}`}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className={styles.title}>{title}</h2>}
        {lede && <p className={styles.lede}>{lede}</p>}
      </header>
    </Reveal>
  );
};
