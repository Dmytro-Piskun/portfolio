"use client"
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "motion/react";
import { hexToRgbA } from "@/utils/colorUtils";
import { animate } from "motion";
import Image from "next/image";
import Link from "next/link";
import usePrimaryColor from "@/hooks/usePrimaryColor";

const getRandomValue = (min, max) => Math.random() * (max - min) + min;

const ProjectCard = ({ preview, title, scrollSpeed, link }) => {
  const container = useRef(null);

  const titleOpacity = useMotionValue(0);
  const titleY = useMotionValue(30);
  const titleScale = useMotionValue(0.7);
  const titleRotateX = useMotionValue(80);

  const isCentered = useInView(container, {
    margin: "-30% -43% -30% -43%"
  });

  const primaryColorRef = usePrimaryColor();

  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  const shadowOpacity = useMotionValue(0);

  const combinedRotation = useTransform(
    rotate,
    (value) => value + scrollSpeed.get() * 3
  );

  const animateFloating = () => {
    animate(y, getRandomValue(-40, 0), {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });

    animate(x, getRandomValue(-40, 40), {
      duration: 3.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });

    animate(rotate, getRandomValue(-3, 3), {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });

    animate(scale, 1, {
      duration: 0.5,
      ease: "easeInOut",
    });

    animate(shadowOpacity, 0, {
      duration: 0.5,
      ease: "easeInOut",
    });

    animate(titleOpacity, 0, {
      duration: 0.3,
      ease: "easeOut",
    });
    animate(titleY, 30, {
      duration: 0.3,
      ease: "easeOut",
    });
    animate(titleRotateX, 80, {
      duration: 0.3,
      ease: "easeOut",
    });
    animate(titleScale, 0.7, {
      duration: 0.3,
      ease: "easeOut",
    })
  };

  useEffect(() => {
    if (isCentered) {
      animate(y, -65, {
        duration: 0.9,
        ease: "easeInOut",
      });
      animate(scale, 1.5, {
        duration: 0.5,
        ease: "easeInOut",
      });
      animate(shadowOpacity, 0.1, {
        duration: 0.5,
        ease: "easeInOut",
      });
      animate(rotate, 0, {
        duration: 0.5,
        ease: "easeInOut",
      });

      // Animate title
      animate(titleOpacity, 1, {
        duration: 0.1,
        ease: "easeOut",
        delay: 0.2,
      });
      animate(titleY, -5, {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      });
      animate(titleRotateX, 0, {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      });
      animate(titleScale, 1, {
        duration: 0.3,
        ease: "easeOut",
      })
    } else {
      animateFloating();
    }
  }, [isCentered]);

  const dropShadow = useTransform(
    shadowOpacity,
    (value) => {
      const primaryColor = primaryColorRef.current;
      return `drop-shadow(0px 0px 200px ${hexToRgbA(primaryColor, value)})`;
    }
  );

  return (
    <div className="relative">

      <motion.div

        style={{
          x,
          y,
          rotate: combinedRotation,
          scale,
          filter: dropShadow,
        }}
        ref={container}
        className="relative will-change-[filter] w-[500px] max-sm:w-[200px] max-lg:w-[300px] max-xl:w-[400px]"
      >
        <motion.div
          style={{
            opacity: titleOpacity,
            y: titleY,
            rotateX: titleRotateX,
            scale: titleScale,
          }}
          className=" z-10 text-center w-full "
        >
          <h3 className="text-3xl origin-bottom max-sm:text-xl">
            {title}
          </h3>
        </motion.div>
        {isCentered ? (
          // <Link href={link} target="_blank" className="block cursor-pointer">
            <Image
              className="w-full object-cover duration-300 saturate-100 opacity-100"
              src={preview}
              height={600}
              width={1000}
              alt="Preview of the project"
            />
          // </Link>
        ) : (
          <Image
            className="w-full object-cover duration-300 saturate-0 opacity-95 cursor-default"
            src={preview}
            height={600}
            width={1000}
            alt="Preview of the project"
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProjectCard;