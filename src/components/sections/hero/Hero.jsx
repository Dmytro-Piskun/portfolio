'use client'
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import Lines from "./Lines";
import SchemeToggle from "./SchemeToggle";
import Time from "./Time";

const Hero = () => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const opacityValue = useTransform(scrollYProgress, [0, 1], [1, -1]);
    const blurValue = useTransform(scrollYProgress, [0, 1], [0, 13]);

    const blur = useMotionTemplate`blur(${blurValue}px)`;

    const headerTransforms = {
        header1Y: useTransform(scrollYProgress, [0, 1], [0, -1100]),
        header2Y: useTransform(scrollYProgress, [0, 1], [0, -1000]),
    };

    const animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 2 }
    };

    return (
        <section ref={container} className="h-[200dvh]">
            <div className="sticky top-0 overflow-hidden">
                <motion.div
                    style={{
                        scale: scaleValue,
                        opacity: opacityValue,
                        filter: blur,
                    }}
                    layout
                    className="origin-[50%_65%] "
                >
                    <div className="h-dvh overflow-hidden flex flex-col">
                        <Lines scrollYProgress={scrollYProgress} />
                        <header className="flex justify-end p-16 text-md grow-0">
                            <div className="flex gap-8 items-center">
                                <Time />
                                <SchemeToggle />
                            </div>
                        </header>
                        <main className="text-primary font-light flex items-center justify-center flex-col h-full grow pb-64">
                            <motion.h1
                                className="text-4xl max-sm:text-3xl pb-5"
                                style={{
                                    y: headerTransforms.header1Y,
                                }}
                                {...animationProps}
                            >
                                Dmytro Piskun
                            </motion.h1>
                            <motion.h2
                                className="text-3xl max-sm:text-2xl max-sm:px-12 text-center"
                                style={{
                                    y: headerTransforms.header2Y,
                                }}
                                {...animationProps}
                            >
                                Frontend Engineer
                            </motion.h2>
                        </main>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};



export default Hero;