"use client";

import React, { useEffect, useRef } from "react";
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

    const waveso = Array.from({ length: 4 }, () => {

      let y;
      let amplitude;
      let distance;

      do {

        y = canvas.height / 2 + (Math.random() - 0.5) * canvas.height / 8;

        amplitude = canvas.height / 4 + (Math.random() - 0.5) * (canvas.height / 8);

        distance = Math.min(y, canvas.height - y);

        console.log("y", y);
        console.log("distance", distance);
        console.log("canvas", canvas.height);

      }
      while (amplitude > distance)

      return {
        y: y,
        length: 0.001 + Math.random() * 0.005,
        amplitude: amplitude,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.5
      };
    });

    const waves = [
      {
        "y": 0.495 * canvas.height, //442
        "length": 0.0035091592714977396,
        "amplitude": 0.312 * canvas.height,
        "phase": 1.8741980240972558,
        "opacity": 0.32078857094734275
      },
      {
        "y": 0.431 * canvas.height,
        "length": 0.002089876783386391,
        "amplitude": 0.27 * canvas.height,
        "phase": 3.1874107467582986,
        "opacity": 0.2398898503017038
      },
      {
        "y": 0.481 * canvas.height,
        "length": 0.0029914248875978493,
        "amplitude": 0.225 * canvas.height,
        "phase": 5.205403233717887,
        "opacity": 0.6681850891411101
      },
      {
        "y": 0.426 * canvas.height,
        "length": 0.002840512557759009,
        "amplitude": 0.291 * canvas.height,
        "phase": 1.1607275057395408,
        "opacity": 0.6739975640248534
      }
    ]

    console.log(waves);

    //y
    //amplitude

    // const maxAmplitude = canvas.height / 4; // Limit max amplitude to avoid going off canvas vertically


    // // Ensure y is within safe bounds
    // const y = Math.random() * (canvas.height * 0.6) + canvas.height * 0.2;

    // // Adjust the amplitude so it doesn't exceed the canvas limits based on y
    // const amplitude = Math.min(30 + Math.random() * 100, maxAmplitude);
    // const adjustedY = Math.min(Math.max(y, amplitude), canvas.height - amplitude);  // Ensure wave doesn't go off bounds

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