import { useEffect, useState, createContext, useContext } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesContext = createContext();

export const ParticlesProvider = ({ children }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <ParticlesContext.Provider value={init}>
      {children}
    </ParticlesContext.Provider>
  );
};

export const useParticles = () => {
  const init = useContext(ParticlesContext);
  return {
    init,
  };
};
