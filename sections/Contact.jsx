import { FilloutStandardEmbed } from "@fillout/react";
import styles from "./Contact.module.css";
import { attributes as basic } from "../content/pages/basic.md";
import { paragraphs } from "../utils";
import { Reveal } from "../components/Reveal";

const FILLOUT_FORM_ID = "phLvfq9qbgus";

export const Contact = ({ eyebrow, title, description }) => {
  const { address, phone_number, email_id } = basic;

  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.info}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.lede}>{description}</p>}

          <dl className={styles.details}>
            <div className={styles.detail}>
              <dt className={styles.detailLabel}>Address</dt>
              <dd className={styles.detailValue}>{paragraphs(address)}</dd>
            </div>
            <div className={styles.detail}>
              <dt className={styles.detailLabel}>Phone</dt>
              <dd className={styles.detailValue}>
                <a href={`tel:${phone_number?.replace(/\s/g, "")}`}>{phone_number}</a>
              </dd>
            </div>
            <div className={styles.detail}>
              <dt className={styles.detailLabel}>Email</dt>
              <dd className={styles.detailValue}>
                <a href={`mailto:${email_id}`}>{email_id}</a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120} className={styles.formCard}>
          <FilloutStandardEmbed filloutId={FILLOUT_FORM_ID} />
        </Reveal>
      </div>
    </section>
  );
};
