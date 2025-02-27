import { motion } from 'motion/react';

export const Swiggly = ({ progress }) => {
  return (
    <svg style={{ height: "400px", translate: "0 -50%", width: "100%" }} xmlns="http://www.w3.org/2000/svg" viewBox="-7.044 6.74277 634 160.2" preserveAspectRatio='none'>
      <motion.path pathLength={progress} d="M2.956 102.072Q51 40 100 100q35 105 121-4 97-157 122-3c30 107 123 61 155-3 30-99 78-44 119-3" stroke="var(--secondary-color)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none" />
    </svg>
  );
}
