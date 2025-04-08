import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import styles from "./Demo.module.css";
import { useRef, useState } from "react";
import classNames from "classnames";
import { processAssetUrl, processString } from "../utils";
import { attributes } from "../content/pages/general-design.md";

export const Demo = ({ title, sub_heading, items }) => {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const itemProgress = useTransform(scrollYProgress, (p) => {
    const itemCount = items?.length + 2;
    const singleItemPercentage = 1 / itemCount;
    const progress = (p % singleItemPercentage) / singleItemPercentage;
    return progress;
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const itemCount = items?.length + 2;
    const singleItemPercentage = 1 / itemCount;
    const activeSlideN = Math.floor(latest / singleItemPercentage) - 1;
    setActiveSlide(activeSlideN);
  });

  return (
    <section
      ref={ref}
      className={styles.wrapper}
      style={{ height: `${items?.length * 100}vh` }}
    >
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subHeading}>{sub_heading}</p>
        </div>
        <div className={styles.demoWrapper}>
          <div className={styles.features}>
            {items?.map((item, i) => (
              <FeaturesItem key={i} {...item} selected={i === activeSlide} />
            ))}
          </div>
          <div className={styles.demo}>
            <AnimatePresence mode="wait">
              {items?.[activeSlide]?.video && (
                <DemoItem
                  key={`demo-item-${activeSlide}`}
                  {...items[activeSlide]}
                  index={activeSlide}
                  progress={itemProgress}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesItem = ({ title, description, selected }) => {
  return (
    <motion.div
      className={classNames(
        styles.featureWrapper,
        selected ? styles.featureSelected : null,
      )}
      layout
    >
      <h3 className={styles.featureTitle}>{title}</h3>
      {selected && (
        <p className={styles.featureDescription}>
          {processString(description)}
        </p>
      )}
    </motion.div>
  );
};

export const DemoItem = ({ video, video_length, progress }) => {
  const { laptop_image } = attributes;
  return (
    <div className={styles.item}>
      <img src={processAssetUrl(laptop_image)} alt="" />
      <motion.video
        autoPlay
        id="demo-video"
        className={styles.video}
        playsInline
        muted
        loop
        src={processAssetUrl(video)}
        type="video/mp4"
      />
    </div>
  );
};
