import { useScroll, useTransform, motion } from "motion/react";
import { processAssetUrl } from "../utils";
import styles from "./VideoScroll.module.css";
import { useRef } from "react";

export const VideoScroll = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item, index) => (
        <VideoItem key={index} {...item} />
      ))}
    </div>
  );
};

export const VideoItem = ({ video, title, sub_heading, description }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.75, 1],
    [1, 1, 0.4, 0.4, 1, 1],
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 1],
    [0, 1, 1, 0],
  );

  return (
    <div className={styles.itemWrapper} ref={ref}>
      <motion.video
        className={styles.video}
        playsInline
        autoPlay
        muted
        loop
        id="hero_video"
        src={processAssetUrl(video)}
        type="video/mp4"
      />
      <motion.div className={styles.videoScreen} style={{ opacity }} />
      <motion.div
        className={styles.textWrapper}
        style={{ opacity: textOpacity }}
      >
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.sub_heading}>{sub_heading}</p>
        <p className={styles.description}>{description}</p>
      </motion.div>
    </div>
  );
};
