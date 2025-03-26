import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { attributes as designAttributes } from "../content/pages/general-design.md";
import styles from "./RollingHills.module.css";
import { useRef } from "react";
import { getCssUrl, processAssetUrl } from "../utils";
import classNames from "classnames";
import { HorizontalScroll } from "./HorizontalScroll";

export const RollingHills = ({
  title,
  sub_heading,
  description,
  tag_line,
  image,
}) => {
  const { rolling_hills_bg, rolling_hills_fg } = designAttributes;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const bg_x = useTransform(scrollYProgress, [0, 1], [20, 30]);

  const fg_x = useTransform(scrollYProgress, [0, 1], [5, 25]);

  const bg_x_percent = useMotionTemplate`${bg_x}%`;
  const fg_x_percent = useMotionTemplate`${fg_x}%`;

  return (
    <section ref={ref} className={styles.wrapper}>
      <motion.div
        className={classNames(styles.rolling, styles.rollingBg)}
        style={{
          backgroundImage: getCssUrl(rolling_hills_bg),
          backgroundPositionX: bg_x_percent,
        }}
      />
      <motion.div
        className={classNames(styles.rolling, styles.rollingFg)}
        style={{
          backgroundImage: getCssUrl(rolling_hills_fg),
          backgroundPositionX: fg_x_percent,
        }}
      />
      <motion.div className={styles.content}>
        <motion.div
          className={styles.textContainer}
          initial={{
            x: 50,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 1 }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subHeading}>{sub_heading}</p>
          <p className={styles.description}>{description}</p>
        </motion.div>
        <motion.div
          className={styles.imageContainer}
          initial={{
            x: -50,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{ duration: 1 }}
        >
          <img src={processAssetUrl(image)} alt="application" />
        </motion.div>
      </motion.div>
    </section>
  );
};
