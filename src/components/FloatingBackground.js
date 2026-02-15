"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import {
    SiGo, SiRedis, SiPostgresql,
    SiKotlin, SiSqlite, SiGit, SiAndroid,
    SiDocker, SiNextdotjs, SiTypescript, SiJavascript,
    SiPython, SiFramer, SiReact, SiKubernetes
} from "react-icons/si";

const techIcons = [
    SiGo, SiRedis, SiPostgresql,
    SiKotlin, SiSqlite, SiGit, SiAndroid,
    SiDocker, SiNextdotjs, SiTypescript, SiJavascript,
    SiPython, SiFramer, SiReact, SiKubernetes
];

export default function FloatingBackground() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [elements, setElements] = useState([]);
    const [returning, setReturning] = useState(false);
    const prevPathnameRef = useRef(pathname);

    // Detect if we're on an article page
    const isArticlePage = pathname?.startsWith('/blog/') && pathname !== '/blog';

    // Detect if we just left an article page
    useEffect(() => {
        const wasOnArticlePage = prevPathnameRef.current?.startsWith('/blog/') && prevPathnameRef.current !== '/blog';
        if (wasOnArticlePage && !isArticlePage) {
            setReturning(true);
            const timer = setTimeout(() => setReturning(false), 2000); // Match or slightly exceed transition duration
            return () => clearTimeout(timer);
        }
        prevPathnameRef.current = pathname;
    }, [pathname, isArticlePage]);

    useEffect(() => {
        setMounted(true);
        // Generate 30 random elements for a denser feel
        const newElements = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            Icon: techIcons[i % techIcons.length],
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 25 + Math.random() * 35, // Slower motion for elegance
            delay: Math.random() * -35,
            size: 1.5 + Math.random() * 2,
            opacity: 0.05 + Math.random() * 0.1,
        }));
        setElements(newElements);
    }, []);

    // Calculate nearest edge and exit position for each element
    const getExitPosition = (el) => {
        const distances = {
            top: el.y,
            bottom: 100 - el.y,
            left: el.x,
            right: 100 - el.x
        };

        const nearest = Object.keys(distances).reduce((a, b) =>
            distances[a] < distances[b] ? a : b
        );

        switch (nearest) {
            case 'top': return { x: `${el.x}vw`, y: '-10vh' };
            case 'bottom': return { x: `${el.x}vw`, y: '110vh' };
            case 'left': return { x: '-10vw', y: `${el.y}vh` };
            case 'right': return { x: '110vw', y: `${el.y}vh` };
            default: return { x: `${el.x}vw`, y: '-10vh' };
        }
    };

    if (!mounted) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0.8,
            }}
        >
            {elements.map((el) => {
                const Icon = el.Icon;
                const exitPos = getExitPosition(el);

                return (
                    <motion.div
                        key={el.id} // Stable key prevents snapping
                        initial={{
                            x: `${el.x}vw`,
                            y: `${el.y}vh`,
                            opacity: 0
                        }}
                        animate={isArticlePage ? {
                            // Exit animation: move to nearest edge and fade out
                            x: exitPos.x,
                            y: exitPos.y,
                            opacity: 0
                        } : {
                            // Normal floating animation or entrance from edge
                            x: [`${el.x}vw`, `${(el.x + 15) % 100}vw`, `${el.x}vw`],
                            y: [`${el.y}vh`, `${(el.y + 20) % 100}vh`, `${el.y}vh`],
                            opacity: [el.opacity, el.opacity * 2.5, el.opacity],
                        }}
                        transition={isArticlePage ? {
                            // Smooth exit transition
                            duration: 1.5,
                            ease: "easeInOut",
                            delay: Math.random() * 0.3,
                        } : {
                            // Normal loop transition with dynamic duration for entrance
                            duration: returning ? 1.5 : el.duration,
                            repeat: Infinity,
                            delay: returning ? Math.random() * 0.3 : el.delay,
                            ease: returning ? "easeOut" : "easeInOut",
                        }}
                        style={{
                            position: 'absolute',
                            color: 'var(--text-muted)',
                            filter: 'grayscale(100%) brightness(0.8)',
                        }}
                    >
                        <Icon size={`${el.size}rem`} />
                    </motion.div>
                );
            })}
        </div>
    );
}
