import { useEffect, useRef, useState } from "react";
import styles from "./Ecosystem.module.css";
import { SectionHeading } from "../components/SectionHeading";
import { assetUrl } from "../utils";

const ORBIT_RADIUS = 41;
/* Lines start outside the student's halo and stop at the avatar's edge so
   they never run under the role labels or the image outlines. */
const LINE_START_RADIUS = 12;
const LINE_END_RADIUS = 35;

const orbitPoint = (index, total, radius) => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
};

const nodePosition = (index, total) => orbitPoint(index, total, ORBIT_RADIUS);

export const Ecosystem = ({ eyebrow, title, description, student_image, members = [] }) => {
  const wheelRef = useRef(null);
  const lastInteraction = useRef(0);
  const [assembled, setAssembled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = wheelRef.current;
    if (!node) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAssembled(true);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Spotlight cycles through the network until the visitor takes over */
  useEffect(() => {
    if (!assembled || members.length === 0) {
      return undefined;
    }
    const id = setInterval(() => {
      if (Date.now() - lastInteraction.current > 6000) {
        setActive((current) => (current + 1) % members.length);
      }
    }, 3200);
    return () => clearInterval(id);
  }, [assembled, members.length]);

  const select = (index) => {
    lastInteraction.current = Date.now();
    setActive((index + members.length) % members.length);
  };

  const flowFrom = orbitPoint(active, members.length, LINE_START_RADIUS);
  const flowTo = orbitPoint(active, members.length, LINE_END_RADIUS);

  const activeY = nodePosition(active, members.length).y;
  const bubbleAbove = activeY > 50;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} lede={description} align="left" />

        <div className={styles.stageWrap}>
          <div
            ref={wheelRef}
            className={`${styles.wheel} ${assembled ? styles.assembled : ""}`}
          >
            <svg className={styles.linesSvg} viewBox="0 0 100 100" aria-hidden>
              {members.map((member, index) => {
                const from = orbitPoint(index, members.length, LINE_START_RADIUS);
                const to = orbitPoint(index, members.length, LINE_END_RADIUS);
                return (
                  <line
                    key={index}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    pathLength="1"
                    className={`${styles.line} ${index === active ? styles.lineActive : ""}`}
                    style={{ "--i": index }}
                  />
                );
              })}
              {assembled && (
                <g key={`flow-${active}`}>
                  <circle className={styles.flowDot} r="1.1">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      path={`M ${flowFrom.x} ${flowFrom.y} L ${flowTo.x} ${flowTo.y}`}
                    />
                  </circle>
                  <circle className={styles.flowDotAlt} r="1.1">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      keyPoints="1;0"
                      keyTimes="0;1"
                      path={`M ${flowFrom.x} ${flowFrom.y} L ${flowTo.x} ${flowTo.y}`}
                    />
                  </circle>
                </g>
              )}
            </svg>

            {members.map((member, index) => {
              const { x, y } = nodePosition(index, members.length);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => select(index)}
                  aria-pressed={index === active}
                  className={`${styles.node} ${index === active ? styles.nodeActive : ""}`}
                  style={{ left: `${x}%`, top: `${y}%`, "--i": index }}
                >
                  {member.image && (
                    <img
                      src={assetUrl(member.image)}
                      alt=""
                      className={styles.nodeImage}
                      loading="lazy"
                    />
                  )}
                  <span className={styles.nodeLabel}>{member.role}</span>
                </button>
              );
            })}

            <div className={styles.center}>
              <span className={styles.centerLabel}>The Student</span>
              <span className={styles.centerAvatar}>
                {student_image && (
                  <img
                    src={assetUrl(student_image)}
                    alt="The student at the centre of the support network"
                    className={styles.centerImage}
                  />
                )}
              </span>
            </div>
          </div>

          <div className={`${styles.bubbles} ${bubbleAbove ? styles.bubblesTop : ""}`}>
            {members.map((member, index) => (
              <article
                key={index}
                aria-hidden={index !== active}
                className={`${styles.bubble} ${index === active ? styles.bubbleActive : ""}`}
              >
                <p className={styles.bubbleMeta}>
                  <span className={styles.bubbleRole}>{member.role}</span>
                  <span className={styles.bubbleCount}>
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(members.length).padStart(2, "0")}
                  </span>
                </p>
                <p className={styles.bubbleQuote}>“{member.description}”</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
