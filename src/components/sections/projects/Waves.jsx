"use client";

import React, { useEffect, useRef} from "react";
import usePrimaryColor from "@/hooks/usePrimaryColor";
import { hexToRgbA } from "@/utils/colorUtils";

const Waves = ({ scrollSpeed, className }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const primaryColorRef = usePrimaryColor();

  const drawWaves = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    const maxAmplitude = canvas.height / 4; // Limit max amplitude to avoid going off canvas vertically
  const waves = Array.from({ length: 15 }, () => {
    // Ensure y is within safe bounds
    const y = Math.random() * (canvas.height * 0.6) + canvas.height * 0.2;

    // Adjust the amplitude so it doesn't exceed the canvas limits based on y
    const amplitude = Math.min(30 + Math.random() * 100, maxAmplitude);
    const adjustedY = Math.min(Math.max(y, amplitude), canvas.height - amplitude);  // Ensure wave doesn't go off bounds

    return {
      y: adjustedY,
      length: 0.002 + Math.random() * 0.005,
      amplitude: amplitude,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.2 + Math.random() * 0.5
    };
  });

    let time = 0;

    const animate = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollVelocity = scrollSpeed.get() || 0;
      const animationSpeed = 0.01 + (scrollVelocity * 0.1);

      const step = 20;

      waves.forEach((wave) => {
        ctx.beginPath();

        const initialYOffset = Math.sin(time + wave.phase) * wave.amplitude;
        ctx.moveTo(0, wave.y + initialYOffset);

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

      time += animationSpeed;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
    };
    
    resizeCanvas();
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvasRef.current.parentElement);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cleanupAnimation = drawWaves();
    return cleanupAnimation;
  }, []);

  return <canvas ref={canvasRef} className={`w-full${className}`} />;
};

export default Waves;