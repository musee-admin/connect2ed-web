import classNames from "classnames";
import { processAssetUrl } from "../utils";
import styles from "./EcosystemPlayers.module.css";

export const EcosystemPlayers = ({
  title,
  description,
  student_image,
  school_counsellor,
  special_educator,
  class_teacher,
  subject_teachers,
  child_psychologist,
  parent,
  behavioural_therapist,
  occupational_therapist,
  speech_therapist,
  assessment_agencies,
  shadow_teacher,
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.mainSubHeading}>{description}</p>
        <h2 className={styles.mainTitle}>{title}</h2>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.studentImageWrapper}>
          <img alt={title} src={processAssetUrl(student_image)} />
        </div>
        <Player
          className={styles.counsellor}
          title="School Counsellor"
          {...school_counsellor}
        />
        <Player
          className={styles.specialEducator}
          title="Special Educator"
          {...special_educator}
        />
        <Player
          className={styles.classTeacher}
          title="Class Teacher"
          {...class_teacher}
        />
        <Player
          className={styles.subjectTeachers}
          title="Subject Teachers"
          {...subject_teachers}
        />
        <Player
          className={styles.childPsychologist}
          title="Child Psychologist"
          {...child_psychologist}
        />
        <Player className={styles.parent} title="Parent" {...parent} />
        <Player
          className={styles.behaviouralTherapist}
          title="Behavioural Therapist"
          {...behavioural_therapist}
        />
        <Player
          className={styles.occupationalTherapist}
          title="Occupational Therapist"
          {...occupational_therapist}
        />
        <Player
          className={styles.speechTherapist}
          title="Speech Therapist"
          {...speech_therapist}
        />
        <Player
          className={styles.assessmentAgencies}
          title="Assessment Agencies"
          {...assessment_agencies}
        />
        <Player
          className={styles.shadowTeacher}
          title="Shadow Teacher"
          {...shadow_teacher}
        />
      </div>
    </section>
  );
};

const Player = ({ title, description, image, className }) => {
  return (
    <div className={classNames(styles.playerWrapper, className)}>
      <div className={styles.imageWrapper}>
        <img alt={title} src={processAssetUrl(image)} />
      </div>
      <h3>{title}</h3>
    </div>
  );
};
