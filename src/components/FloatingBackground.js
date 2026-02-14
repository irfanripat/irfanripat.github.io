"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    const [mounted, setMounted] = useState(false);
    const [elements, setElements] = useState([]);

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
                            x: [`${el.x}vw`, `${(el.x + 15) % 100}vw`, `${el.x}vw`],
                            y: [`${el.y}vh`, `${(el.y + 20) % 100}vh`, `${el.y}vh`],
                            opacity: [el.opacity, el.opacity * 2.5, el.opacity],
                        }}
                        transition={{
                            duration: el.duration,
                            repeat: Infinity,
                            delay: el.delay,
                            ease: "easeInOut",
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
