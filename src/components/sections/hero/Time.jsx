"use client";
import { motion } from "motion/react";

const Time = () => {
  const date = new Date();

  const options = {
    timeZone: "Europe/Vilnius",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  let lithuanianTime = date.toLocaleString("en-US", options);

  if (lithuanianTime.startsWith("24")) {
    lithuanianTime = "00" + lithuanianTime.slice(2);
  }

  const isDST = new Date().getTimezoneOffset() < -120;

  return (
    <p className=" text-primary font-light font-condensed text-xl max-sm:text-xl">
      LITHUANIA, {lithuanianTime.toString()} {isDST ? "GMT+3" : "GMT+2"}
    </p>
  );
};

export default Time;
