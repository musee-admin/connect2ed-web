import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import graphAnimation from "../constants/graphLottie.json";
import { useInView } from "react-intersection-observer";
import styles from "./DevelopmentGraph.module.css";

export const DevelopmentGraph = ({ title, description }) => {
  const animationRef = useRef();
  const { ref, inView } = useInView({
    threshold: 0.2, // Play when 20% of the animation is visible
  });

  console.log({ inView });

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current.play();
    }
  }, [inView]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.contentWrapper} ref={ref}>
        <div className={styles.title}>{title}</div>
        <div className={styles.graphWrapper} ref={ref}>
          <Lottie
            className={styles.graph}
            lottieRef={animationRef}
            animationData={graphAnimation}
            loop={false}
            autoplay={false}
          />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};
