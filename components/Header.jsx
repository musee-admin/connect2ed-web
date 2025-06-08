import { useScroll, useMotionValueEvent, motion } from "motion/react";
import { useState } from "react";
import styles from "./Header.module.css";
import { processAssetUrl } from "../utils";
import Link from "next/link";
import classNames from "classnames";
import { attributes } from "../content/pages/basic.md";

export const Header = () => {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const { full_logo } = attributes;
  const removeActive = () => {
    setIsActive(false);
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current < 400) {
      return;
    }
    const diff = current - scrollY.getPrevious();
    setScrollDirection(diff > 0 ? "down" : "up");
  });
  return (
    <motion.div
      id="main-header"
      key="main-header"
      animate={scrollDirection}
      variants={{
        down: {
          y: "-100%",
        },
        up: {
          y: "0%",
        },
      }}
      exit={{ opacity: 0, y: -100 }}
      className={styles.wrapper}
    >
      <header className={styles.header}>
        <nav className={`${styles.navbar}`}>
          <div className={styles.logo}>
            <Link href="/">
              <img
                src={processAssetUrl(full_logo)}
                alt="logo"
                className={styles.img}
              />
            </Link>
          </div>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <div className={classNames(styles.navHalf, styles.navHalFirst)}>
              <li onClick={removeActive}>
                <Link href="/" className={`${styles.navLink}`}>
                  Home
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="/our-solution" className={`${styles.navLink}`}>
                  Our Solution
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="/about-us" className={`${styles.navLink}`}>
                  About us
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="/knowledge-center" className={`${styles.navLink}`}>
                  Knowledge Center
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="/our-ecosystem" className={`${styles.navLink}`}>
                  Our Ecosystem
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="/contact-us" className={`${styles.navLink}`}>
                  Contact us
                </Link>
              </li>
            </div>
          </ul>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </motion.div>
  );
};
