'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useTransform } from 'motion/react';

const Lines = ({ scrollYProgress }) => {
    const line1 = useRef();
    const line2 = useRef();
    const line3 = useRef();
    const line4 = useRef();


    const [line1Length, setLine1Length] = useState(10000);
    const [line2Length, setLine2Length] = useState(10000);
    const [line3Length, setLine3Length] = useState(10000);
    const [line4Length, setLine4Length] = useState(10000);

    const line1Scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
    const line2Scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
    const line3Scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
    const line4Scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

    useEffect(() => {

        setLine1Length(line1.current.getTotalLength());
        setLine2Length(line2.current.getTotalLength());
        setLine3Length(line3.current.getTotalLength());
        setLine4Length(line4.current.getTotalLength());

    }, []);

    return (
        <div className="h-full w-full absolute pointer-events-none">
            <svg height="100%" viewBox="0 0 1595 823" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" className="w-full h-full opacity-50">
                <g clipPath="url(#clip0_386_2)">
                    <motion.path ref={line1} initial={{
                        strokeDasharray: line1Length,
                        strokeDashoffset: line1Length,
                    }} animate={{
                        strokeDasharray: line1Length,
                        strokeDashoffset: 0
                    }} transition={{
                        duration: 1.2,
                        ease: "easeInOut"

                    }}
                        style={{
                            scale: line1Scale,
                        }}
                        d="M1174 -16.873C1153.67 150.991 1210.2 458.574 1599 345.992C2085 205.264 1708.5 44.0818 1593 38.7636C1477.5 33.4454 1366.5 155.764 1316 186.446C1265.5 217.128 1115 201.582 1071.5 186.446C1028 171.31 828.001 127.128 693.501 264.992C559.001 402.856 683.501 579.584 726.501 619.675C769.501 659.766 940 792.721 1110.5 824.221" stroke="var(--primary-color)" strokeWidth="2" />
                    <motion.path initial={{
                        strokeDasharray: line2Length,
                        strokeDashoffset: line2Length,
                    }} animate={{
                        strokeDasharray: line2Length,
                        strokeDashoffset: 0
                    }} transition={{
                        duration: 1.6,
                        ease: "easeInOut"

                    }}
                        style={{
                            scale: line2Scale,
                        }}
                        ref={line2} d="M1101 -17.6912C1087.67 28.6726 1019.8 120.255 855 115.673C690.2 111.091 728.667 24.8544 768.5 -17.6912C793.834 -56.8277 810.101 -125.119 672.501 -85.1915C534.901 -45.264 683.167 118.264 774.501 195.037C900.834 277.537 1133.8 467.738 1055 568.538C976.2 669.339 814.167 659.357 743 641.766C654.667 618.857 453.9 606.911 357.5 742.403C237 911.767 88.5 710.494 75 658.948C61.5 607.402 61.5 521.902 4 478.947" stroke="var(--primary-color)" strokeWidth="2" />
                    <motion.path initial={{
                        strokeDasharray: line3Length,
                        strokeDashoffset: line3Length,
                    }} animate={{
                        strokeDasharray: line3Length,
                        strokeDashoffset: 0
                    }} transition={{
                        duration: 1.2,
                        ease: "easeInOut"

                    }} ref={line3}
                        style={{
                            scale: line3Scale,
                        }}
                        d="M245.501 -18.9185C340.501 67.6728 457.001 261.637 163.001 344.765C-204.499 448.674 -99.4993 209.355 -231.999 219.582C-364.499 229.81 -433.999 596.357 -222.999 590.22C-11.9993 584.084 481 427.811 501 826.676C521 1225.54 601 914.222 595.5 805.812C590 697.403 708.5 730.948 734 743.221C759.5 755.494 820 791.085 856 826.676" stroke="var(--primary-color)" strokeWidth="2" />
                    <motion.path initial={{
                        strokeDasharray: line4Length,
                        strokeDashoffset: line4Length,
                    }} animate={{
                        strokeDasharray: line4Length,
                        strokeDashoffset: 0
                    }} transition={{
                        duration: 2,
                        ease: "easeInOut"

                    }} ref={line4}
                        style={{
                            scale: line4Scale,
                        }}
                        d="M1597.5 594.72C1442.5 592.266 1289.5 673.675 1326.5 822.585" stroke="var(--primary-color)" strokeWidth="2" />
                </g>

            </svg>
        </div>
    );
};

export default Lines;