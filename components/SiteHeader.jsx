import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SiteHeader.module.css";
import { attributes as basic } from "../content/pages/basic.md";
import { assetUrl } from "../utils";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-solution", label: "Our Solution" },
  { href: "/our-ecosystem", label: "Our Ecosystem" },
  { href: "/knowledge-center", label: "Knowledge Center" },
  { href: "/about-us", label: "About Us" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide only after clearing the hero top so the header never vanishes
      // right at the top of the page; any upward scroll brings it back.
      if (y > lastY && y > 120) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        hidden && !menuOpen ? styles.hidden : ""
      }`}
    >
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
