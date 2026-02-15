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
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const prevPathnameRef = useRef(pathname);

    // Detect if we're on an article page
    const isArticlePage = pathname?.startsWith('/blog/') && pathname !== '/blog';

    useEffect(() => {
        setMounted(true);
        // Generate 30 random elements
        const newElements = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            Icon: techIcons[i % techIcons.length],
            x: Math.random() * 100,
            y: Math.random() * 100,
            // Base drift speed
            vx: (Math.random() - 0.5) * 0.05,
            vy: 0.1 + Math.random() * 0.1,
            size: 1.5 + Math.random() * 2,
            opacity: 0.05 + Math.random() * 0.1,
        }));
        setElements(newElements);

        const handleOrientation = (e) => {
            const x = (e.gamma || 0) / 45;
            const y = (e.beta || 0) / 45;
            setTilt({ x, y });
        };

        const initTilt = () => {
            console.log("FloatingBackground: Initializing orientation listener");
            window.addEventListener("deviceorientation", handleOrientation);
        };

        const requestPermission = async () => {
            console.log("FloatingBackground: Requesting permission...");
            try {
                if (typeof window.DeviceOrientationEvent !== 'undefined' &&
                    typeof window.DeviceOrientationEvent.requestPermission === 'function') {

                    const response = await window.DeviceOrientationEvent.requestPermission();
                    console.log("FloatingBackground: Permission response:", response);
                    if (response === 'granted') {
                        initTilt();
                    }
                } else {
                    console.log("FloatingBackground: Permission API not found, assuming non-iOS");
                    initTilt();
                }
            } catch (err) {
                console.error("FloatingBackground: Permission error:", err);
                initTilt();
            }
        };

        // Attach to multiple events to ensure any interaction triggers it
        const events = ['click', 'touchstart', 'mousedown'];
        const trigger = () => {
            console.log("FloatingBackground: User interaction detected");
            requestPermission();
            events.forEach(e => window.removeEventListener(e, trigger));
        };

        events.forEach(e => window.addEventListener(e, trigger));

        return () => {
            events.forEach(e => window.removeEventListener(e, trigger));
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    // Animation loop for gravity and wrapping
    useEffect(() => {
        if (!mounted || elements.length === 0) return;

        let frameId;
        const move = () => {
            setElements(prev => prev.map(el => {
                // Calculate new position with tilt influence
                let nextX = el.x + el.vx + (tilt.x * 0.05);
                let nextY = el.y + el.vy + (tilt.y * 0.05);

                // Screen wrapping logic (0-100 range)
                if (nextX > 105) nextX = -5;
                if (nextX < -5) nextX = 105;
                if (nextY > 105) nextY = -5;
                if (nextY < -5) nextY = 105;

                return { ...el, x: nextX, y: nextY };
            }));
            frameId = requestAnimationFrame(move);
        };

        frameId = requestAnimationFrame(move);
        return () => cancelAnimationFrame(frameId);
    }, [mounted, elements.length, tilt]);

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
                        initial={false}
                        animate={{
                            left: `${el.x}vw`,
                            top: `${el.y}vh`,
                            opacity: isArticlePage ? 0 : el.opacity,
                        }}
                        transition={{
                            // Smoother positional updates
                            left: { type: "spring", stiffness: 50, damping: 20, mass: 1 },
                            top: { type: "spring", stiffness: 50, damping: 20, mass: 1 },
                            opacity: { duration: 1.5, ease: "easeInOut" }
                        }}
                        style={{
                            position: 'absolute',
                            color: 'var(--text-muted)',
                            filter: 'grayscale(100%) brightness(0.8)',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Icon size={`${el.size}rem`} />
                    </motion.div>
                );
            })}
        </div>
    );
}
