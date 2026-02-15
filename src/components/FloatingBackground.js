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
            const timer = setTimeout(() => setReturning(false), 2000);
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

                return (
                    <motion.div
                        key={el.id}
                        initial={{
                            x: `${el.x}vw`,
                            y: `${el.y}vh`,
                            opacity: 0
                        }}
                        animate={{
                            // Continuous floating animation
                            x: [`${el.x}vw`, `${(el.x + 15) % 100}vw`, `${el.x}vw`],
                            y: [`${el.y}vh`, `${(el.y + 20) % 100}vh`, `${el.y}vh`],
                            // Fade based on page state
                            opacity: isArticlePage ? 0 : [el.opacity, el.opacity * 2.5, el.opacity],
                        }}
                        transition={{
                            duration: el.duration,
                            repeat: Infinity,
                            delay: el.delay,
                            ease: "easeInOut",
                            // Property-specific transition for opacity to make it respond faster to route changes
                            opacity: {
                                duration: returning || isArticlePage ? 1.5 : el.duration,
                                repeat: isArticlePage ? 0 : Infinity,
                                delay: (returning || isArticlePage) ? Math.random() * 0.3 : el.delay,
                                ease: "easeInOut"
                            }
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
