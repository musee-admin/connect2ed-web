import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SiteHeader.module.css";
import { attributes as basic } from "../content/pages/basic.md";
import { assetUrl } from "../utils";

export const NAV_LINKS = [
  { href: "/our-solution", label: "Our Solution" },
  { href: "/our-ecosystem", label: "Our Ecosystem" },
  { href: "/knowledge-center", label: "Knowledge Center" },
  { href: "/about-us", label: "About Us" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Link2Ed home">
          <img src={assetUrl(basic.full_logo)} alt="Link2Ed" className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname === href ? styles.active : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/contact-us" className={`btn btnPrimary ${styles.cta}`}>
            Book a Demo
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.srOnly}>{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`} aria-hidden />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
      >
        <Link href="/" className={styles.mobileLink}>
          Home
        </Link>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className={styles.mobileLink}>
            {label}
          </Link>
        ))}
        <Link href="/contact-us" className={`btn btnPrimary ${styles.mobileCta}`}>
          Book a Demo
        </Link>
      </nav>
    </header>
  );
};
