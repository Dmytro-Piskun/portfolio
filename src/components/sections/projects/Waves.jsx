"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import usePrimaryColor from "@/hooks/usePrimaryColor";
import { hexToRgbA } from "@/utils/colorUtils";

const Waves = React.memo(({ scrollSpeed, className }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const primaryColorRef = usePrimaryColor();

  // Memoize wave generation to prevent unnecessary recalculations
  const waves = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      y: 0, // Initial y will be set in drawWaves
      length: 0.002 + Math.random() * 0.005,
      amplitude: 30 + Math.random() * 100,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.2 + Math.random() * 0.5
    }));
  }, []);

  const drawWaves = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    // Resize handling
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    // Initialize waves y position on each draw to adapt to canvas height
    waves.forEach((wave) => {
      wave.y = canvas.height / 2 + (Math.random() - 0.5) * 200;
    });

    let time = 0;
    let lastTime = 0;

    const animate = (currentTime) => {
      // Use requestAnimationFrame's timestamp for smoother animation
      if (!lastTime) lastTime = currentTime;
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to frame time
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollVelocity = scrollSpeed.get() || 0;
      const animationSpeed = 0.01 + (scrollVelocity * 0.1);

      const step = 20;
      
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x < canvas.width; x += step) {
          const yOffset = Math.sin(x * wave.length + time + wave.phase) * wave.amplitude;
          ctx.lineTo(x, wave.y + yOffset);
        }
        
        const finalYOffset = Math.sin(canvas.width * wave.length + time + wave.phase) * wave.amplitude;
        ctx.lineTo(canvas.width, wave.y + finalYOffset);

        ctx.lineWidth = 2;
        ctx.strokeStyle = hexToRgbA(primaryColorRef.current, wave.opacity);
        ctx.stroke();
      });

      time += animationSpeed * deltaTime;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollSpeed, waves, primaryColorRef]);

  useEffect(() => {
    const cleanupAnimation = drawWaves();
    return cleanupAnimation;
  }, [drawWaves]);

  return <canvas ref={canvasRef} className={`w-full${className}`} />;
});

export default Waves;