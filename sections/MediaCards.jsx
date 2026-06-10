import { useEffect, useRef } from "react";
import styles from "./MediaCards.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

/* Plays only while on screen to keep many looping videos cheap. */
const LazyVideo = ({ src, className }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={assetUrl(src)}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
};

export const MediaCards = ({ eyebrow, title, description, items }) => (
  <section className={`section ${styles.section}`}>
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} lede={description} />
      <div className={styles.grid}>
        {items?.map((item, index) => (
          <Reveal key={index} delay={index * 80}>
            <article className={styles.card}>
              {item.video && <LazyVideo src={item.video} className={styles.video} />}
              <div className={styles.cardBody}>
                {item.sub_heading && <p className={styles.kicker}>{item.sub_heading}</p>}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
