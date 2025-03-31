import { FilloutStandardEmbed } from "@fillout/react";
import styles from "./ContactUsForm.module.css";
import { attributes } from "../content/pages/basic.md";
import { processString } from "../utils";

export const ContactUsForm = ({ title, sub_heading }) => {
  const { address, phone_number, email_id } = attributes;
  return (
    <section className={styles.wrapper}>
      <div className={styles.titleSection}>
        <p className={styles.subHeading}>{sub_heading}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.innerWrapper}>
        <FilloutStandardEmbed filloutId="phLvfq9qbgus" />
        <div className={styles.detailsWrapper}>
          <div className={styles.address}>
            <p className={styles.addressTitle}>Address:</p>
            <p className={styles.details}>{processString(address)}</p>
          </div>
          <div className={styles.contactDetails}>
            <p className={styles.addressTitle}>Contact Details:</p>
            <p className={styles.details}>{processString(phone_number)}</p>
            <p className={styles.details}>{processString(email_id)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
