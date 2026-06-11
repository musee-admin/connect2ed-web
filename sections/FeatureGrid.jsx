import Link from "next/link";
import styles from "./FeatureGrid.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";

const ACCENTS = [
  { light: "#1757c2", dark: "#6fa1f2" },
  { light: "#7c3aed", dark: "#a78bfa" },
  { light: "#0e7e68", dark: "#2dd4bf" },
  { light: "#c2348b", dark: "#f472b6" },
  { light: "#0e7490", dark: "#22d3ee" },
  { light: "#b45309", dark: "#fbbf24" },
];

const trackPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export const FeatureGrid = ({ eyebrow, title, description, tone, cta_text, cta_link, items }) => {
  const dark = tone === "dark";

  return (
    <section className={`section ${dark ? styles.dark : ""}`}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} lede={description} onDark={dark} />
        <div className={styles.grid}>
          {items?.map((item, index) => {
            const accent = ACCENTS[index % ACCENTS.length][dark ? "dark" : "light"];
            return (
              <Reveal key={index} delay={index * 90} className={styles.revealCard}>
                <article className={styles.card} style={{ "--accent": accent }} onMouseMove={trackPointer}>
                  <span className={styles.hairline} aria-hidden="true" />
                  <span className={styles.ghost} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardBody}>{item.description}</p>
                </article>
              </Reveal>
            );
          })}
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
