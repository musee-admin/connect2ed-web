import styles from "./Cards.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

const trackPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export const Cards = ({ eyebrow, title, description, items }) => (
  <section className={`section ${styles.section}`}>
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} lede={description} />
      <div className={styles.grid}>
        {items?.map((item, index) => (
          <Reveal key={index} delay={(index % 3) * 80}>
            <article className={styles.card} style={{"--accent": "var(--teal-600)"}} onMouseMove={trackPointer}>
              <span className={styles.hairline} aria-hidden="true" />
              {item.image && (
                <img src={assetUrl(item.image)} alt={item.title} className={styles.image} />
              )}
              <div className={styles.cardBody}>
                {item.sub_heading && <p className={styles.kicker}>{item.sub_heading}</p>}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {item.description && <p className={styles.cardText}>{item.description}</p>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
