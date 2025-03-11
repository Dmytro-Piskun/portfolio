"use client";
import Image from 'next/image'
import SomebodyHireThisGuy from '@/assets/SomebodyHireThisGuy.gif'
import AnimatedText from './AnimatedTeaxt';
import Lines from '../projects/Lines';
import { motion } from 'motion/react';
import Text from './Text';

const Contacts = () => {
    return (
        <section className="h-[100dvh]  text-3xl flex items-center justify-center">


            {/*  <a className='z-50 font-light' href="mailto:dmitriy.piskun.dp@gmail.com">dmitriy.piskun.dp@gmail.com</a> */}

            {/* <Image
                src={SomebodyHireThisGuy}
                width={200}
                height={200}
                alt="SomebodyHireThisGuy GIF"

            />
            <AnimatedText></AnimatedText> */}
аппвапавпваапв

            <svg xmlns="http://www.w3.org/2000/svg" className='w-[2000px]' viewBox="-10 -10 30 20">
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


            </svg>



            {/* <Text text={"dmitriy.piskun.dp@gmail.com"} fontSize={40} particleSize={1} particleCount={10000}/> */}




        </section>
    );
};

export default Contacts;



