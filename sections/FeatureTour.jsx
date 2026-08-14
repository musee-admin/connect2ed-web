import { useEffect, useRef, useState } from "react";
import styles from "./FeatureTour.module.css";
import { assetUrl } from "../utils";

/* Each demo ships as webm (VP9) + mp4 (h264) next to a webp poster frame, all
   named off the mp4 in the page content. */
const sources = (video) => ({
  webm: assetUrl(video.replace(/\.mp4$/, ".webm")),
  mp4: assetUrl(video),
  poster: assetUrl(video.replace(/\.mp4$/, "-poster.webp")),
});

/* Stacked feature card for phones; its video plays while scrolled into view */
const MobileFeature = ({ item, index }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) {
          return;
        }
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const media = sources(item.video);

  return (
    <article ref={ref} className={styles.mobileItem}>
      <p className={styles.mobileIndex}>{String(index + 1).padStart(2, "0")}</p>
      <h3 className={styles.mobileTitle}>{item.title}</h3>
      <p className={styles.mobileText}>{item.description}</p>
      <div className={styles.frame}>
        <div className={styles.chrome} aria-hidden>
          <span className={styles.chromeDot} />
          <span className={styles.chromeDot} />
          <span className={styles.chromeDot} />
          <span className={styles.chromePill}>{item.title}</span>
        </div>
        <div className={styles.screen}>
          <video
            ref={videoRef}
            className={styles.mobileShot}
            poster={media.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${item.title} demo video`}
          >
            <source src={media.webm} type="video/webm" />
            <source src={media.mp4} type="video/mp4" />
          </video>
        </div>
      </div>
    </article>
  );
};

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
    /* Warm the next clip so the swap doesn't stall on an empty buffer. Touching
       the DOM property directly: React keeps rendering preload="none" for these
       and never patches it back, so the hint sticks once we've used it. */
    const next = videoRefs.current[active + 1];
    if (inView && next && next.preload === "none") {
      next.preload = "auto";
      next.load();
    }
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
    <section>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ "--track-height": `${items.length * 60 + 100}vh` }}
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
                {items.map((item, index) => {
                  const media = sources(item.video);
                  return (
                    <video
                      key={index}
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      className={`${styles.shot} ${index === active ? styles.shotActive : ""}`}
                      poster={media.poster}
                      muted
                      loop
                      playsInline
                      /* Only the opening clip loads up front; the rest are
                         fetched one ahead as the tour advances */
                      preload={index === 0 ? "metadata" : "none"}
                      onTimeUpdate={index === active ? onTimeUpdate : undefined}
                      aria-label={`${item.title} demo video`}
                    >
                      <source src={media.webm} type="video/webm" />
                      <source src={media.mp4} type="video/mp4" />
                    </video>
                  );
                })}
              </div>
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
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className={styles.heading}>{title}</h2>
            {description && <p className={styles.lede}>{description}</p>}
          </header>

          <div className={styles.mobileList}>
            {items.map((item, index) => (
              <MobileFeature key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
