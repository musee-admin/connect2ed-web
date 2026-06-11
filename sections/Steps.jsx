import { useEffect, useRef, useState } from "react";
import styles from "./Steps.module.css";
import { assetUrl } from "../utils";

/* Position-aware class so steps slide through in the scroll direction
   instead of merely fading. */
const stepClass = (index, active, base, prev, next) => {
  if (index === active) {
    return base;
  }
  return `${base} ${index < active ? prev : next}`;
};

export const Steps = ({ title, description, items = [] }) => {
  const trackRef = useRef(null);
  const railFillRef = useRef(null);
  const [active, setActive] = useState(0);

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
      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleY(${progress})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

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
    <section>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ "--track-height": `${items.length * 70 + 100}vh` }}
      >
        <div className={styles.stage}>
        <div className={`container ${styles.inner}`}>
          <header className={styles.header}>
            <h2 className={styles.heading}>{title}</h2>
            {description && <p className={styles.lede}>{description}</p>}
          </header>

          <div className={styles.layout}>
            <ol className={styles.rail}>
              <span className={styles.railTrack} aria-hidden />
              <span ref={railFillRef} className={styles.railFill} aria-hidden />
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={index === active ? "step" : undefined}
                    className={`${styles.railItem} ${index === active ? styles.railActive : ""} ${index < active ? styles.railPassed : ""}`}
                  >
                    <span className={styles.dot} aria-hidden />
                    <span className={styles.railLabel}>{item.title}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.viewer}>
              {items.map((item, index) => (
                <article
                  key={index}
                  className={stepClass(index, active, styles.step, styles.stepPrev, styles.stepNext)}
                  aria-hidden={index !== active}
                >
                  <p className={styles.ghost} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className={styles.stepNumber}>Step {index + 1}</p>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  {item.sub_heading && <p className={styles.kicker}>{item.sub_heading}</p>}
                  <p className={styles.text}>{item.description}</p>
                </article>
              ))}
            </div>

            <div className={styles.artWrap}>
              {items.map((item, index) =>
                item.image ? (
                  <img
                    key={index}
                    src={assetUrl(item.image)}
                    alt=""
                    loading="lazy"
                    className={stepClass(index, active, styles.art, styles.artPrev, styles.artNext)}
                  />
                ) : null,
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Static stacked layout for phones / short viewports; the pinned
         stage above is hidden there via the same media query. */}
      <div className={styles.mobile}>
        <div className="container">
          <header className={styles.header}>
            <h2 className={styles.heading}>{title}</h2>
            {description && <p className={styles.lede}>{description}</p>}
          </header>

          <ol className={styles.mobileList}>
            {items.map((item, index) => (
              <li key={index} className={styles.mobileStep}>
                <p className={styles.stepNumber}>Step {index + 1}</p>
                <h3 className={styles.mobileTitle}>{item.title}</h3>
                {item.sub_heading && <p className={styles.kicker}>{item.sub_heading}</p>}
                <p className={styles.text}>{item.description}</p>
                {item.image && (
                  <img
                    src={assetUrl(item.image)}
                    alt=""
                    loading="lazy"
                    className={styles.mobileArt}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
