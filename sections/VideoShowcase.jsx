import { useEffect, useRef, useState } from "react";
import styles from "./VideoShowcase.module.css";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

const Panel = ({ item, index, total }) => {
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const trackHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrollable = trackHeight - viewportHeight;

        if (scrollable <= 0) {
          setProgress(0);
          return;
        }

        const p = Math.max(0, Math.min(1, -rect.top / scrollable));
        setProgress(p);

        const video = videoRef.current;
        if (video) {
          if (rect.bottom > 0 && rect.top < viewportHeight) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeAmt = (() => {
    const reveal = progress / 0.02;
    const conceal = (progress - 0.98) / 0.02;
    return Math.max(0, Math.min(1, Math.min(reveal, 1 - conceal)));
  })();

  const cap = (offset) => {
    return Math.max(0, Math.min(1, (activeAmt - offset) / 0.3));
  };

  return (
    <div className={styles.panelTrack} ref={trackRef}>
      <article className={styles.panel}>
        <video
          ref={videoRef}
          className={styles.video}
          src={assetUrl(item.video)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{ transform: `scale(${1.14 - activeAmt * 0.14})` }}
        />
        <div className={styles.scrim} />
        <div className={styles.blackOverlay} style={{ opacity: 1 - activeAmt }} />
        <div className={`container ${styles.caption}`}>
          <p className={styles.counter}
            style={{
              opacity: cap(0),
              transform: `translateY(${28 * (1 - cap(0))}px)`,
            }}
          >
            {String(index + 1).padStart(2, "0")}
            <span className={styles.counterTotal}> / {String(total).padStart(2, "0")}</span>
          </p>
          {item.sub_heading && (
            <p className={styles.kicker}
              style={{
                opacity: cap(0.1),
                transform: `translateY(${28 * (1 - cap(0.1))}px)`,
              }}
            >
              {item.sub_heading}
            </p>
          )}
          <h3 className={styles.title}
            style={{
              opacity: cap(0.2),
              transform: `translateY(${28 * (1 - cap(0.2))}px)`,
            }}
          >
            {item.title}
          </h3>
          <p className={styles.text}
            style={{
              opacity: cap(0.3),
              transform: `translateY(${28 * (1 - cap(0.3))}px)`,
            }}
          >
            {item.description}
          </p>
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
