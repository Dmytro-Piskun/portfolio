"use client";

import BlackjackPreview from "@/assets/project-preview/BlackjackPreview.png"
import StudentManagementSystemPreview from "@/assets/project-preview/StudentManagementSystemPreview.png"
import PortfolioPreview from "@/assets/project-preview/PortfolioPreview.png"
import FakePreview from "@/assets/project-preview/FakePreview.png"
import Fake2Preview from "@/assets/project-preview/Fake2Preview.png"
import Waves from "./Waves";
import ProjectCard from "./ProjectCard";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useVelocity } from "motion/react";


const Projects = () => {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    }
    )

    const scrollSpeed = useVelocity(scrollYProgress);

    const translateX = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "-120%"]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.75, 1],
        [1, 1, 1.5]
    );

    const translateY = useTransform(
        scrollYProgress,
        [0, 0.75, 1],
        ["0%", "0%", "-150%"]
    );

    useMotionValueEvent(scale, "change", (latest) => {
        console.log("Scale:", latest);
    });
    useMotionValueEvent(translateY, "change", (latest) => {
        console.log("translateY:", latest);
    });

    const projects = [
        {
            title: "Student Management System",
            img: StudentManagementSystemPreview,
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
        <section ref={container} className="h-[300vh]  text-center text-xl ">
            <div className="sticky top-0 h-screen flex bg-opacity-50 flex-col  justify-center font-light overflow-hidden">


                <motion.div

                    style={{
                        scale,
                        translateY
                    }}
                    className="flex flex-col mt-[5rem] justify-center"

                >
                    <motion.div
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
                    </motion.div>
                    <Waves className="absolute mt-[25rem]" scrollSpeed={scrollSpeed} />

                </motion.div>

                {/* <Lines/> */}

            </div>
        </section>
    );
};

export default Projects;


