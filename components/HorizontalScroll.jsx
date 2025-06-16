import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import styles from "./HorizontalScroll.module.css";
import { processAssetUrl } from "../utils";
import { Swiggly } from "../uiComponents/Swiggly.jsx";
import { attributes as designAttributes } from "../content/pages/general-design.md";

export const HorizontalScroll = ({ title, sub_heading, items }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  const { left_arrow, right_arrow } = designAttributes;

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW],
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  const moveNext = () => {
    const bodyRect = document.body.getBoundingClientRect();
    const element = containerRef.current;
    const elementRect = element.getBoundingClientRect();
    const offset = elementRect.top - bodyRect.top;
    const currentScroll = window.scrollY;
    const scrollMultiplier = window.innerWidth < 1100 ? 0.53 : 1.5;
    window.scrollTo(
      0,
      Math.min(
        currentScroll + window.innerHeight * scrollMultiplier,
        offset + elementRect.height - window.innerHeight,
      ),
    );
  };
  const movePrev = () => {
    const bodyRect = document.body.getBoundingClientRect();
    const element = containerRef.current;
    const elementRect = element.getBoundingClientRect();
    const offset = elementRect.top - bodyRect.top;
    const currentScroll = window.scrollY;
    const scrollMultiplier = window.innerWidth < 1100 ? 0.53 : 1.5;
    window.scrollTo(
      0,
      Math.max(currentScroll - window.innerHeight * scrollMultiplier, offset),
    );
  };

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        <div className={styles.navigationActions}>
          <button onClick={movePrev}>
            <img src={processAssetUrl(left_arrow)} alt="left" />
          </button>
          <button onClick={moveNext}>
            <img src={processAssetUrl(right_arrow)} alt="right" />
          </button>
        </div>
        <div className={styles.titleSection}>
          <p className={styles.subHeading}>{sub_heading}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className={styles.itemsContainer}
        >
          {items.map((item, i) => (
            <HorizontalScrollItem
              key={i}
              {...item}
              variant={i % 2 === 0 ? "primary" : "secondary"}
            />
          ))}
          <div className={styles.hr} style={{ width: scrollRange }}>
            <Swiggly progress={scrollYProgress} />
          </div>
        </motion.section>
      </div>
      <div
        ref={ghostRef}
        style={{ height: scrollRange }}
        className={styles.ghost}
      />
    </div>
  );
};

export const HorizontalScrollItem = ({
  title,
  sub_heading,
  description,
  image,
  variant,
}) => {
  return (
    <div className={styles.item} id="horizontal-scroll-item">
      <div
        className={styles.itemContent}
        style={{
          background:
            variant === "primary"
              ? "var(--primary-color)"
              : "var(--accent-color-1)",
        }}
      >
        <div className={styles.textContent}>
          <h3
            className={styles.itemTitle}
            style={{
              color: variant === "primary" ? "white" : "var(--accent-c)",
            }}
          >
            {title}
          </h3>
          <h3
            className={styles.itemSubHeading}
            style={{
              color:
                variant === "primary"
                  ? "var(--secondary-color)"
                  : "var(--primary-color)",
            }}
          >
            {sub_heading}
          </h3>
          <p
            className={styles.itemDescription}
            style={{
              color: variant === "primary" ? "white" : "var(--primary-color)",
            }}
          >
            {description}
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img src={processAssetUrl(image)} alt="background" />
        </div>
      </div>
    </div>
  );
};
