import {
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  motion,
} from "motion/react";
import { useState } from "react";
import styles from "./Header.module.css";
import { processAssetUrl } from "../utils";
import Link from "next/link";
// import { attributes } from "../content/pages/basics.md";

export const Header = () => {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("up");

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
      <div className={styles.logoContainer}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles.linkSection}>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/our-solution">Our Solution</Link>
            </li>
            <li>
              <Link href="/knowledge-center">Knowledge Center</Link>
            </li>
            <li>
              <Link href="/our-ecosystem">Our Ecosystem</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};
