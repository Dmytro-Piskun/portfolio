'use client'
import Lenis from 'lenis'
import { useEffect } from 'react';

const LenisProvider = ({ children, scrollBlockDuration = 0 }) => {

  useEffect(() => {

    const timer = setTimeout(() => {

      const lenis = new Lenis()

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

    }, scrollBlockDuration);

    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {children}
    </>
  );
};

export default LenisProvider;