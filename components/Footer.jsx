import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import styles from "./Footer.module.css";
import { useRef } from "react";
import Link from "next/link";
import { attributes } from "../content/pages/basic.md";
import { processAssetUrl, processString } from "../utils";

export const Footer = () => {
  const ref = useRef(null);
  const { message, address, phone_number, mini_logo } = attributes;

  return (
    <>
      <div className={styles.endingSpacer}></div>
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src={processAssetUrl(mini_logo)} alt="logo" />
            <div className={styles.message}>{message}</div>
          </div>
          <div className={styles.links}>
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
          </div>
          <div className={styles.info}>
            <div className={styles.address}>{processString(address)}</div>
            <div className={styles.phone}>{processString(phone_number)}</div>
          </div>
        </div>
        <div className={styles.hangingContent}>
          <div className={styles.hangingContentText}>
            For any enquiries or feedback contact us at
            <a href="mailto:enquiry@connec2ed.com">enquiry@connec2ed.com</a>
          </div>
        </div>
      </section>
      <div ref={ref} className={styles.endingSpacer}></div>
    </>
  );
};
