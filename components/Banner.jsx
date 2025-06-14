import styles from "./Banner.module.css";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { getCssUrl, processAssetUrl, processString } from "../utils";
import { LinkButton } from "../uiComponents/Button";
import classNames from "classnames";
import { useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { particlesConfig } from "../constants/particlesConfig";

export const Banner = ({
  title,
  description,
  hero_image,
  cta_text,
  cta_link,
  title_1,
  description_1,
  title_2,
  description_2,
  title_3,
  description_3,
  title_4,
  description_4,
}) => {
  return (
    <section className={classNames(styles.wrapper)}>
      <Particles
        className={styles.particles}
        id="landing-particles"
        options={particlesConfig}
      />
      <motion.div className={styles.primaryWrapper}>
        <motion.div className={styles.contentWrapper}>
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>
              {processString(description)}
            </div>
            {cta_text && <LinkButton href={cta_link}>{cta_text}</LinkButton>}
          </div>
          <div>
            <img src={processAssetUrl(hero_image)} alt="" />
          </div>
        </motion.div>
        <div className={styles.mobileSpacer} />
        <div className={styles.extraSections}>
          <ExtraItem title={title_1} description={description_1} />
          <ExtraItem title={title_2} description={description_2} />
          <ExtraItem title={title_3} description={description_3} />
          <ExtraItem title={title_4} description={description_4} />
        </div>
      </motion.div>
    </section>
  );
};

const ExtraItem = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.extraItem}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered && (
          <motion.div
            className={styles.titleWrapper}
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute" }}
          >
            <h2>{title}</h2>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            className={styles.descriptionWrapper}
            key={description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute" }}
          >
            <p>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
