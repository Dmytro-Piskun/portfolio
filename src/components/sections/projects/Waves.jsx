"use client";

import { hexToRgbA } from "@/utils/colorUtils";
import { useEffect, useRef } from "react";

const Waves = ({ scrollSpeed, className }) => {
  const canvasRef = useRef(null);
  const animationSpeedRef = useRef(0.01);

  const primaryColorRef = useRef(
    getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()
  );

  useEffect(() => {
    
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    let time = 0;
    let animationFrameId;

    const waves = [];
    const waveCount = 15;

    // Initialize waves with controlled randomness
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: canvas.height / 2 + (Math.random() - 0.5) * 200,
        length: 0.002 + Math.random() * 0.005,
        amplitude: 30 + Math.random() * 100,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.5
      });
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;

      waves.forEach((wave) => {
        wave.y = canvas.height / 2 + (Math.random() - 0.5) * 50;
      });
    };

    window.addEventListener("resize", handleResize);

    function drawWaves() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollVelocity = scrollSpeed.get() || 0;
      animationSpeedRef.current = 0.01 + (scrollVelocity * 0.1);

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

      time += animationSpeedRef.current;
      animationFrameId = requestAnimationFrame(drawWaves);
    }

    drawWaves();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollSpeed]);

  return <canvas ref={canvasRef} className={`w-full${className}`} />;
};

export default Waves;