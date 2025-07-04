"use client";

import BlackjackPreview from "@/assets/project-preview/BlackjackPreview.png"
import StudentManagementSystemPreview from "@/assets/project-preview/StudentManagementSystemPreview.png"
import PortfolioPreview from "@/assets/project-preview/PortfolioPreview.png"
import FakePreview from "@/assets/project-preview/FakePreview.png"
import Fake2Preview from "@/assets/project-preview/Fake2Preview.png"
import Waves from "./Waves";
import ProjectCard from "./ProjectCard";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useVelocity, useMotionTemplate } from "motion/react";


const Projects = () => {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const scrollSpeed = useVelocity(scrollYProgress);

    const translateX = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "-190%"]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.75, 1],
        [1, 1, 2]
    );

    const blurValue = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0, 0, 15]
    );

    const blur = useMotionTemplate`blur(${blurValue}px)`;

    const translateY = useTransform(
        scrollYProgress,
        [0, 0.50, 1],
        ["0%", "0%", "150%"]
    );

    const projects = [
        {
            img: StudentManagementSystemPreview,
            title: "Student Management System",
            link: "https://github.com/Dmytro-Piskun/student-management-system"
        },
        // {
        //     title: "Fake2",
        //     img: Fake2Preview,
        //     link: "somelink"
        // },
        {
            title: "Blackjack",
            img: BlackjackPreview,
            link: "https://github.com/Dmytro-Piskun/blackjack"
        },
        // {
        //     title: "Fake",
        //     img: FakePreview,
        //     link: "somelink"
        // },
        {
            title: "Portfolio",
            img: PortfolioPreview,
            link: "https://github.com/Dmytro-Piskun/portfolio"
        },

    ]



    return (
        <section ref={container} className="h-[400vh]  text-center text-xl">
            <div className="sticky top-0 h-screen flex bg-opacity-50 flex-col  justify-center font-light overflow-hidden">
                <motion.div

                    style={{
                        scale,
                        translateY,
                        filter: blur,
                    }}
                    className="flex flex-col mt-[5rem] justify-center"

                >
                    {/* <motion.div
                        style={{
                            translateX: translateX,
                        }}
                        className=" flex gap-80 max-sm:gap-44  absolute  w-fit pl-[100vw]"
                    >
                        {projects.map((project, index) => {

                            return (
                                <ProjectCard key={index} title={project.title} preview = {project.img} link={project.link} scrollSpeed={scrollSpeed}/>
                            );
                        })}
                    </motion.div> */}
                    <Waves className="absolute mt-96 max-sm:mt-40" scrollSpeed={scrollSpeed} />

                </motion.div>

                {/* <Lines/> */}

            </div>
        </section>
    );
};

export default Projects;


