"use client";

import Image from 'next/image';
import switchOn from '@/assets/scheme-switch/switch-on.png';
import switchOff from '@/assets/scheme-switch/switch-off.png';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SchemeToggle = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedScheme = localStorage.getItem("prefered-color-scheme");
            if (savedScheme) {
                setIsSwitchOn(savedScheme === "light");
            } else {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                setIsSwitchOn(!prefersDark);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof document !== "undefined") {
            const root = document.documentElement;
            if (isSwitchOn) {
                root.style.setProperty('--primary-color', '#313131');
                root.style.setProperty('--secondary-color', '#6c757d');
                root.style.setProperty('--accent-color', '#383838');
                root.style.setProperty('--background-color', '#ffffff');
            } else {
                root.style.setProperty('--primary-color', '#ffffff');
                root.style.setProperty('--secondary-color', '#cccccc');
                root.style.setProperty('--accent-color', '#ffffff');
                root.style.setProperty('--background-color', '#252525');
            }
        }
    }, [isSwitchOn]);

    const handleSchemeToggle = () => {
        setIsSwitchOn((prev) => {
            const newScheme = prev ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem("prefered-color-scheme", newScheme);
            }
            return !prev;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Image
                onClick={handleSchemeToggle}
                className="rotate-3 w-12 cursor-pointer"
                alt="lightswitch"
                src={isSwitchOn ? switchOn : switchOff}
            />
        </motion.div>
    );
};

export default SchemeToggle;
