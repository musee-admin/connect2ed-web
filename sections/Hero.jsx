import Link from "next/link";
import styles from "./Hero.module.css";
import { assetUrl } from "../utils";
import { Reveal } from "../components/Reveal";

export const Hero = ({
  eyebrow,
  title,
  lead,
  image,
  image_alt,
  primary_cta_text,
  primary_cta_link,
  secondary_cta_text,
  secondary_cta_link,
  stats,
}) => {
  const hasImage = Boolean(image);
  const hasCtas = Boolean(primary_cta_text || secondary_cta_text);

  return (
    <section className={`${styles.hero} ${hasImage ? "" : styles.compact}`}>
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.content}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {hasCtas && (
            <div className={styles.ctas}>
              {primary_cta_text && (
                <Link href={primary_cta_link || "/contact-us"} className="btn btnPrimary">
                  {primary_cta_text}
                </Link>
              )}
              {secondary_cta_text && (
                <Link href={secondary_cta_link || "/our-solution"} className="btn btnGhost">
                  {secondary_cta_text}
                </Link>
              )}
            </div>
          )}
        </Reveal>

        {hasImage && (
          <Reveal delay={120} className={styles.media}>
            <img
              src={assetUrl(image)}
              alt={image_alt || title}
              className={styles.image}
              fetchPriority="high"
            />
          </Reveal>
        )}
      </div>

      {stats?.length > 0 && (
        <div className="container">
          <Reveal delay={200}>
            <dl className={styles.stats}>
              {stats.map(({ value, label }, index) => (
                <div key={index} className={styles.stat}>
                  <dt className={styles.statLabel}>{label}</dt>
                  <dd className={styles.statValue}>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      )}
    </section>
  );
};
