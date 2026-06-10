import styles from "./Steps.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

export const Steps = ({ eyebrow, title, description, items }) => (
  <section className="section">
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} lede={description} align="center" />
      <ol className={styles.grid}>
        {items?.map((item, index) => (
          <Reveal key={index} delay={(index % 3) * 80}>
            <li className={styles.card}>
              {item.image && (
                <img src={assetUrl(item.image)} alt="" className={styles.illustration} />
              )}
              <p className={styles.stepNumber}>Step {index + 1}</p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.sub_heading && <p className={styles.kicker}>{item.sub_heading}</p>}
              <p className={styles.cardText}>{item.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
