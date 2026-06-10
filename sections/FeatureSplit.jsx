import Link from "next/link";
import styles from "./FeatureSplit.module.css";
import { paragraphs, assetUrl } from "../utils";
import { Reveal } from "../components/Reveal";

export const FeatureSplit = ({
  eyebrow,
  title,
  description,
  image,
  image_alt,
  image_side,
  image_fit,
  cta_text,
  cta_link,
}) => (
  <section className="section">
    <div
      className={`container ${styles.grid} ${image_side === "left" ? styles.imageLeft : ""}`}
    >
      <Reveal className={styles.content}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{paragraphs(description)}</div>
        {cta_text && (
          <Link href={cta_link || "/"} className={`btn btnGhost ${styles.cta}`}>
            {cta_text}
          </Link>
        )}
      </Reveal>
      {image && (
        <Reveal delay={120} className={styles.media}>
          <img
            src={assetUrl(image)}
            alt={image_alt || title}
            className={`${styles.image} ${image_fit === "contain" ? styles.contain : ""}`}
          />
        </Reveal>
      )}
    </div>
  </section>
);
