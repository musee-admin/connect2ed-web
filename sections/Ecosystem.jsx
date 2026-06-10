import styles from "./Ecosystem.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../utils";

export const Ecosystem = ({ eyebrow, title, description, intro, student_image, members }) => (
  <section className="section">
    <div className="container">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        lede={description}
        align="center"
      />

      {(student_image || intro) && (
        <Reveal>
          <div className={styles.studentCard}>
            {student_image && (
              <img
                src={assetUrl(student_image)}
                alt="A student at the centre of their support network"
                className={styles.studentImage}
              />
            )}
            {intro && <p className={styles.intro}>{intro}</p>}
          </div>
        </Reveal>
      )}

      <div className={styles.grid}>
        {members?.map((member, index) => (
          <Reveal key={index} delay={(index % 3) * 70}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                {member.image && (
                  <img
                    src={assetUrl(member.image)}
                    alt=""
                    className={styles.avatar}
                    loading="lazy"
                  />
                )}
                <h3 className={styles.role}>{member.role}</h3>
              </div>
              <p className={styles.quote}>“{member.description}”</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
