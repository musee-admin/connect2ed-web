import { useRef, useEffect, useState } from 'react';

import Lenis from 'lenis';

import styles from './Home.module.css';
import { Hero } from './Hero';
import { Support } from './Support';
import { CriticalWindow } from './CriticalWindow';
import { Milestones } from './Milestones';

export const Home = () => {
  const [cs, setCs] = useState(false);
  const lenis = useRef(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 0.7, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });

    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.current.destroy();
    };
  }, []);

  useEffect(() => {
    setCs(true);
  }, [])

  const propositionRef = useRef();
  return (
    <section className={styles.wrapper} ref={lenis}>
      <Hero nextRef={propositionRef} />
      <Support ref={propositionRef} />
      <CriticalWindow />
      {cs && <Milestones />}
    </section>
  )
}
