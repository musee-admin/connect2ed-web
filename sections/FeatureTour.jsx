import { useEffect, useRef, useState } from "react";
import styles from "./FeatureTour.module.css";
import { assetUrl } from "../utils";

export const FeatureTour = ({ eyebrow, title, description, items = [] }) => {
  const trackRef = useRef(null);
  const videoRefs = useRef([]);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) {
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Scroll through the track advances the active feature */
  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActive(Math.min(items.length - 1, Math.floor(progress * items.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }
      if (index === active && inView) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }
  }, [active, inView]);

  const onTimeUpdate = (event) => {
    const video = event.currentTarget;
    if (progressRef.current && video.duration) {
      progressRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
    }
  };

  const goTo = (index) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const top = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (scrollable * (index + 0.5)) / items.length,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={trackRef}
      className={styles.track}
      style={{ height: `${items.length * 60 + 100}vh` }}
    >
      <div className={styles.stage}>
        <div className={`container ${styles.inner}`}>
          <header className={styles.header}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className={styles.heading}>{title}</h2>
            {description && <p className={styles.lede}>{description}</p>}
          </header>

          <div className={styles.layout}>
            <ol className={styles.list}>
              {items.map((item, index) => (
                <li key={index} className={styles.item}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-expanded={index === active}
                    className={`${styles.itemButton} ${index === active ? styles.itemActive : ""}`}
                  >
                    <span className={styles.itemIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </button>
                  <div
                    className={`${styles.itemBody} ${index === active ? styles.itemBodyOpen : ""}`}
                  >
                    <div className={styles.itemBodyInner}>
                      <p className={styles.itemText}>{item.description}</p>
                      <span className={styles.progress} aria-hidden>
                        <span
                          ref={index === active ? progressRef : null}
                          className={styles.progressFill}
                        />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.frame}>
              <div className={styles.chrome} aria-hidden>
                <span className={styles.chromeDot} />
                <span className={styles.chromeDot} />
                <span className={styles.chromeDot} />
                <span className={styles.chromePill}>{items[active]?.title}</span>
              </div>
              <div className={styles.screen}>
                {items.map((item, index) => (
                  <video
                    key={index}
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className={`${styles.shot} ${index === active ? styles.shotActive : ""}`}
                    src={assetUrl(item.video)}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onTimeUpdate={index === active ? onTimeUpdate : undefined}
                    aria-label={`${item.title} demo video`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
