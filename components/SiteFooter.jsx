import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { attributes as basic } from "../content/pages/basic.md";
import { NAV_LINKS } from "./SiteHeader";
import { paragraphs } from "../utils";
import { Reveal } from "./Reveal";

const SOCIALS = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "x", label: "X" },
];

export const SiteFooter = () => {
  const { message, address, phone_number, email_id } = basic;
  const socials = SOCIALS.filter(({ key }) => basic[key]);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <Reveal>
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>{message}</h2>
            <Link href="/contact-us" className="btn btnOnDark">
              Book a Demo
            </Link>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <p className={styles.brandName}>Link2Ed</p>
            <p className={styles.tagline}>
              School psychology &amp; special education. Streamlined.
            </p>
          </div>

          <nav className={styles.linkCol} aria-label="Footer">
            <p className={styles.colTitle}>Explore</p>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.link}>
                {label}
              </Link>
            ))}
            <Link href="/contact-us" className={styles.link}>
              Contact Us
            </Link>
          </nav>

          <div className={styles.contactCol}>
            <p className={styles.colTitle}>Contact</p>
            <address className={styles.address}>{paragraphs(address)}</address>
            <a href={`tel:${phone_number?.replace(/\s/g, "")}`} className={styles.link}>
              {phone_number}
            </a>
            <a href={`mailto:${email_id}`} className={styles.link}>
              {email_id}
            </a>
            {socials.length > 0 && (
              <div className={styles.socials}>
                {socials.map(({ key, label }) => (
                  <a
                    key={key}
                    href={basic[key]}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Link2Ed Technology Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
