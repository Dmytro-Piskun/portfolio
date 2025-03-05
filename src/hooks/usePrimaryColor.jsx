import { useRef, useEffect } from 'react';

const usePrimaryColor = () => {
  const primaryColorRef = useRef( typeof window === "undefined" ? '' :
    getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePrimaryColor = () => {
      const newColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color')
        .trim();
      if (newColor !== primaryColorRef.current) {
        primaryColorRef.current = newColor;
      }
    };

    updatePrimaryColor();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          updatePrimaryColor();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return primaryColorRef;
};

export default usePrimaryColor;