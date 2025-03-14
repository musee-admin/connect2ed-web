import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import styles from "./Demo.module.css";
import { useId, useRef, useState } from "react";
import classNames from "classnames";
import { processAssetUrl, processString } from "../utils";

const variants = {
  enter: ({ x, y }) => {
    return {
      opacity: 0,
      scale: 0,
      x,
      y,
    };
  },
  center: ({ x, y }) => {
    return {
      opacity: 1,
      scale: 1,
      x,
      y,
    };
  },
  exit: ({ x, y }) => {
    return {
      opacity: 0,
      scale: 0,
      x,
      y,
    };
  },
};

const defaultAnimationProps = {
  custom: {},
  variants,
  initial: "enter",
  animate: "center",
  exit: "exit",
  transition: {},
};

export const Demo = ({ title, sub_heading, items }) => {
  const ref = useRef(null);
  const [direction, setDirection] = useState("up");
  const [activeSlide, setActiveSlide] = useState();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const diff = latest - scrollYProgress.getPrevious();
    setDirection(diff > 0 ? "down" : "up");
    const itemCount = items.length + 2;
    const singleItemPercentage = 1 / itemCount;
    const activeSlideN = Math.floor(latest / singleItemPercentage) - 1;
    setActiveSlide(activeSlideN);
  });

  return (
    <section ref={ref} className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subHeading}>{sub_heading}</p>
        </div>
        <div className={styles.demoWrapper}>
          <div className={styles.features}>
            {items.map((item, i) => (
              <FeaturesItem key={i} {...item} selected={i === activeSlide} />
            ))}
          </div>
          <div className={styles.demo}>
            <AnimatePresence mode="wait">
              <DemoItem
                key={`demo-item-${activeSlide}`}
                {...items[activeSlide]}
                index={activeSlide}
              />
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

export const DemoItem = (props) => {
  if (props.index < 0) {
    return null;
  }
  if (props.type === "single-image") {
    return <SingleImage {...props} />;
  }
  if (props.type === "triple-image") {
    return <TripleImage {...props} />;
  }
  return <div></div>;
};

export const SingleImage = ({ images, index }) => {
  const id = useId();
  return (
    <motion.div className={styles.singleItem} {...defaultAnimationProps}>
      <img src={processAssetUrl(images[0])} alt="demo-image" />
    </motion.div>
  );
};

export const TripleImage = ({ images, index }) => {
  return (
    <motion.div className={styles.tripleImageWrapper}>
      <motion.div
        className={styles.tripleFirstImage}
        {...defaultAnimationProps}
        custom={{ x: "-50%", y: "-50%" }}
      >
        <img src={processAssetUrl(images[0])} alt="demo-image" />
      </motion.div>
      <motion.div
        className={styles.tripleSecondImage}
        {...defaultAnimationProps}
        transition={{ ...defaultAnimationProps.transition, delay: 0.2 }}
      >
        <img src={processAssetUrl(images[1])} alt="demo-image" />
      </motion.div>
      <motion.div
        className={styles.tripleThirdImage}
        {...defaultAnimationProps}
        transition={{ ...defaultAnimationProps.transition, delay: 0.4 }}
      >
        <img src={processAssetUrl(images[2])} alt="demo-image" />
      </motion.div>
    </motion.div>
  );
};
