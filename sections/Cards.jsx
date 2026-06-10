import styles from "./Cards.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

export const Cards = ({ eyebrow, title, description, items }) => (
  <section className={`section ${styles.section}`}>
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} lede={description} />
      <div className={styles.grid}>
        {items?.map((item, index) => (
          <Reveal key={index} delay={(index % 3) * 80}>
            <article className={styles.card}>
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
