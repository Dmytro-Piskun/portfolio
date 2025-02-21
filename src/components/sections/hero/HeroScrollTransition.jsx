'use client'
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { useRef } from "react";

const HeroScrollTransition = ({ children }) => {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    })

    const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 8])
    const opacityValue = useTransform(scrollYProgress, [0, 1], [1, -1])
    const blurValue = useTransform(scrollYProgress, [0, 1], [0, 3])

    const blur = useMotionTemplate`blur(${blurValue}px)`

    return (
        <section ref={container} className="h-[200dvh]  max-sm:h-[200dvh]">
            <div className="sticky top-0  overflow-hidden">
                <motion.div style={{
                    scale: scaleValue,
                    opacity: opacityValue,
                    filter: blur,
                }} className="origin-[50%_70%]">
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroScrollTransition;