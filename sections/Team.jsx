import styles from "./Team.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { paragraphs, assetUrl } from "../utils";

export const Team = ({ eyebrow, title, description, items }) => (
  <section className={`section ${styles.section}`}>
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} lede={description} align="center" />
      <div className={styles.grid}>
        {items?.map((person, index) => (
          <Reveal key={index} delay={(index % 2) * 80}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                {person.image && (
                  <img
                    src={assetUrl(person.image)}
                    alt={person.name}
                    className={styles.photo}
                    loading="lazy"
                  />
                )}
                <div>
                  {person.tag && <p className={styles.tag}>{person.tag}</p>}
                  <h3 className={styles.name}>{person.name}</h3>
                  <p className={styles.creds}>{person.creds}</p>
                </div>
              </div>
              <div className={styles.bio}>{paragraphs(person.description)}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
