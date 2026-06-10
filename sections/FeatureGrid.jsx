import Link from "next/link";
import styles from "./FeatureGrid.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";

export const FeatureGrid = ({ eyebrow, title, description, tone, cta_text, cta_link, items }) => {
  const dark = tone === "dark";

  return (
    <section className={`section ${dark ? styles.dark : ""}`}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} lede={description} onDark={dark} />
        <div className={styles.grid}>
          {items?.map((item, index) => (
            <Reveal key={index} delay={index * 80}>
              <article className={styles.card}>
                <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {cta_text && (
          <Reveal className={styles.ctaRow}>
            <Link href={cta_link || "/"} className={`btn ${dark ? "btnOnDark" : "btnPrimary"}`}>
              {cta_text}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};
