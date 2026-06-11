import { useEffect, useRef, useState } from "react";
import styles from "./VideoShowcase.module.css";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

const Panel = ({ item, index, total }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);
  const prevRatio = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const goingOut = ratio < prevRatio.current;
        prevRatio.current = ratio;

        if (!goingOut && ratio >= 0.85) {
          setActive(true);
        } else if (goingOut && ratio <= 0.65) {
          setActive(false);
        }

        const video = videoRef.current;
        if (video) {
          if (ratio > 0) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: thresholds },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.panelTrack}>
      <article ref={ref} className={`${styles.panel} ${active ? styles.active : ""}`}>
        <video
          ref={videoRef}
          className={styles.video}
          src={assetUrl(item.video)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className={styles.scrim} />
        <div className={styles.blackOverlay} />
        <div className={`container ${styles.caption}`}>
          <p className={styles.counter}>
            {String(index + 1).padStart(2, "0")}
            <span className={styles.counterTotal}> / {String(total).padStart(2, "0")}</span>
          </p>
          {item.sub_heading && <p className={styles.kicker}>{item.sub_heading}</p>}
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.description}</p>
        </div>
      </article>
    </div>
  );
};

export const VideoShowcase = ({ eyebrow, title, description, items }) => (
  <section className={styles.section}>
    <div className={`container ${styles.header}`}>
      <Reveal>
        {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
        <h2 className={styles.heading}>{title}</h2>
        {description && <p className={styles.lede}>{description}</p>}
      </Reveal>
    </div>
    <div>
      {items?.map((item, index) => (
        <Panel key={index} item={item} index={index} total={items.length} />
      ))}
    </div>
  </section>
);
