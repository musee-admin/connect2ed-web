import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const Layout = ({ children }) => {
  const [init, setInit] = useState(false);
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
    initParticlesEngine(async (engine) => {
      if (!init) {
        await loadSlim(engine);
      }
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
