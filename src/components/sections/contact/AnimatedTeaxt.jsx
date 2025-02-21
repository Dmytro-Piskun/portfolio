"use client"

import { motion } from "motion/react";

const AnimatedText = () => {
  return (
    <a href="mailto:dmitriy.piskun.dp@gmail.com">
    <svg width="800" height="400">
      <path id="myPath" d="M 20 200 C 200 100, 400 300, 600 200" fill="none" stroke="none"/>
      <motion.text 
        initial={{ letterSpacing: 0 }}
        animate={{ letterSpacing: 6 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        style={{ fontSize: "24px", fill: "black", fontWeight: "bold" }}
      >
        <textPath href="#myPath" startOffset="0%">
          dmitriy.piskun.dp@gmail.com
        </textPath>
      </motion.text>
    </svg>
    </a>
  );
};

export default AnimatedText;
