"use client";
import Image from 'next/image'
import SomebodyHireThisGuy from '@/assets/SomebodyHireThisGuy.gif'
import AnimatedText from './AnimatedTeaxt';
import Lines from '../projects/Lines';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import Text from './Text';
import { useRef } from 'react';

const Contacts = () => {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // const dValue = useTransform(scrollYProgress, [0, 0.99, 1], [10, 15, 10])

    // const d = useMotionTemplate`M 0 10 Q 10 ${dValue} 20 10`;

    const top = useTransform(scrollYProgress, [0, 1], ["-10%", "50%"])

    return (
        <section ref={container} className="h-[200vh] text-3xl">

            <div className="sticky top-0 overflow-hidden h-screen w-full flex flex-col gap-80 justify-center items-center">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className='w-full' viewBox="0 0 20 20">
                    <motion.path
                        d={d} // Initial path
                       stroke="var(--primary-color)"
                        fill="none"
                        strokeWidth="0.03"
                    // animate={{
                    //     d: "M 0 0 C 2 -3 5 4 6 0 S 9 2 11 0 S 15 2 17 0 S 20 0 20 0", // Target path
                    // }}
                    // transition={{
                    //     duration: 10, // Duration of the animation
                    //     ease: "easeInOut", // Easing function for smoothness
                    // }}
                    />
                </svg> */}
                <motion.div
                    className='flex flex-col gap-8 text-center'
                    style={{ top, left: "50%", translateX: "-50%", translateY: "-50%", position: "absolute" }}
                >

                    {/* <Image
                        src={SomebodyHireThisGuy}
                        width={200}
                        height={200}
                        alt="SomebodyHireThisGuy GIF"

                    /> */}

                    <a className='z-50 font-light' href="mailto:dmitriy.piskun.dp@gmail.com">dmitriy.piskun.dp@gmail.com</a>
                    <div className='flex gap-8 items-center justify-center'>
                        <a href="https://www.linkedin.com/in/dmytro-piskun-84760b2a7/" className='font-light'>Linkedin</a>
                        <a href="https://github.com/Dmytro-Piskun" className='font-light'>Github</a>
                        <a href="https://t.me/dmitriyPiskun" className='font-light'>Telegram</a>
                    </div>



                </motion.div>



            </div>


            {/* <AnimatedText></AnimatedText> */}


            {/* <svg xmlns="http://www.w3.org/2000/svg" className='w-[2000px]' viewBox="-10 -10 30 20">
                <motion.path
                    id={"path1"}
                    d="M 0 0 C 5 0 9 9 6 0 S 21 0 11 0 S 26 7 17 0 S 20 0 20 0" // Initial path
                    stroke="black"
                    fill="none"
                    strokeWidth="0.3"
                    animate={{
                        d: "M 0 0 C 2 -3 5 4 6 0 S 9 2 11 0 S 15 2 17 0 S 20 0 20 0", // Target path
                    }}
                    transition={{
                        duration: 10, // Duration of the animation
                        ease: "easeInOut", // Easing function for smoothness
                    }}
                />
                <motion.text
                    fill="black"
                    fontSize="1"
                    fontFamily="Arial, sans-serif"
                    letterSpacing={1}
                    animate={{
                        // x: [0, 20], // Static position, can adjust based on animation needs
                        // y: [0, 10], // Static position, can adjust based on animation needs
                    }}
                    transition={{ duration: 1 }}
                >
                    <textPath href="#path1">dmitriy.piskun.dp@gmail.com</textPath>
                </motion.text>


            </svg> */}



            {/* <Text text={"dmitriy.piskun.dp@gmail.com"} fontSize={40} particleSize={1} particleCount={10000}/> */}




        </section>
    );
};

export default Contacts;



