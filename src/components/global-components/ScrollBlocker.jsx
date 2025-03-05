'use client'
import LenisProvider from "@/lib/lenis/LenisProvider";
import { useEffect, useState } from "react";

const ScrollBlocker = ({ children }) => {
    const [isScrollBlocked, setIsScrollBlocked] = useState(true);

    const scrollBlockDuration = 3000;

    useEffect(() => {
        window.history.scrollRestoration = 'manual'
        if (isScrollBlocked) {
            document.body.style.overflow = 'hidden';

            const timer = setTimeout(() => {
                document.body.style.overflow = 'auto';
                setIsScrollBlocked(false);
            }, scrollBlockDuration);

            return () => clearTimeout(timer);
        }
    }, [isScrollBlocked]);

    return (
        <>
            <LenisProvider scrollBlockDuration={scrollBlockDuration}>
                {children}
            </LenisProvider>
        </>
    );
};

export default ScrollBlocker;