"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Prank() {
    const [active, setActive] = useState(false);
    const [elements, setElements] = useState([]);

    useEffect(() => {
        let interval;
        if (active) {
            // Continuously spawn items while active
            interval = setInterval(() => {
                const isCow = Math.random() > 0.7; // 30% chance for a cow
                const newElement = {
                    id: Math.random(),
                    type: isCow ? 'cow' : 'text',
                    text: isCow ? '🐄' : 'FATIMAH',
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    endX: Math.random() * 100,
                    endY: Math.random() * 100,
                    rotate: Math.random() * 720,
                    scale: isCow ? (1 + Math.random() * 3) : (0.5 + Math.random() * 1.5),
                    duration: 1.5 + Math.random() * 2
                };
                setElements((prev) => [...prev.slice(-60), newElement]); // Keep last 60 for performance
            }, 100);

            const timeout = setTimeout(() => {
                setActive(false);
                setElements([]);
            }, 10000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [active]);

    const triggerPrank = () => {
        if (active) return;

        setActive(true);

        // Create audio and loop it continuously
        const audio = new Audio('/irfanripat/audio/prank.mp3');
        audio.volume = 1.0;
        audio.loop = true; // Loop the audio

        // Start playing
        audio.play().catch(err => console.log('Audio play failed:', err));

        // Stop after 10 seconds when prank ends
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 10000);
    };

    return (
        <>
            <button
                onClick={triggerPrank}
                className="prank-trigger"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--secondary-black)',
                    color: 'var(--background)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 100,
                    fontSize: '0.9rem'
                }}
            >
                Surprise Me ✨
            </button>

            <AnimatePresence>
                {active && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 9999,
                            pointerEvents: 'none',
                            overflow: 'hidden',
                            backgroundColor: 'rgba(255, 0, 0, 0.05)',
                            backdropFilter: 'blur(1px)'
                        }}
                    >
                        {elements.map((el) => (
                            <motion.div
                                key={el.id}
                                initial={{ scale: 0, opacity: 0, x: '50vw', y: '50vh' }}
                                animate={{
                                    scale: el.scale,
                                    opacity: [0, 1, 1, 0],
                                    x: `${el.endX}vw`,
                                    y: `${el.endY}vh`,
                                    rotate: el.rotate
                                }}
                                transition={{ duration: el.duration, ease: "easeOut" }}
                                style={{
                                    position: 'absolute',
                                    fontSize: el.type === 'cow' ? '5rem' : '3.5rem',
                                    fontWeight: 900,
                                    color: el.type === 'cow' ? 'white' : '#ff0000',
                                    textShadow: el.type === 'cow' ? 'none' : '3px 3px 0px #000, -1px -1px 0px #000',
                                    whiteSpace: 'nowrap',
                                    zIndex: el.type === 'cow' ? 10001 : 10000
                                }}
                            >
                                {el.text}
                            </motion.div>
                        ))}

                        {/* The Original Boss Cow stays */}
                        <motion.div
                            animate={{
                                scale: [2, 4, 2],
                                rotate: [0, 15, -15, 0]
                            }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '12rem',
                                zIndex: 10002
                            }}
                        >
                            🐄
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
