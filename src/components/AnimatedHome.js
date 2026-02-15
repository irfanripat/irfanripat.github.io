"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedHome({ latestPosts }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="section"
        >
            <motion.header variants={itemVariants} style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>
                    Backend Engineer <br />
                    <span style={{ color: 'var(--text-muted)' }}>building scalable systems.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', maxWidth: '600px', color: 'var(--text-main)' }}>
                    I'm Irfan, a backend engineer based in Indonesia.
                    I specialize in building high-performance distributed systems with Golang,
                    designing robust APIs, and optimizing backend infrastructure at scale.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                    <a href="https://github.com/irfanripat" target="_blank">Github</a>
                    <a href="https://linkedin.com/in/irfanripat" target="_blank">Linkedin</a>
                    <a href="https://www.instagram.com/irfanripat/" target="_blank">Instagram</a>
                </div>
            </motion.header>

            <motion.div variants={itemVariants} className="section">
                <h2 className="label">Featured Projects</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="card"
                    >
                        <span className="label">Android</span>
                        <h3>Native Mobile Explorer</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Building captivating Android applications with Kotlin.</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="card"
                    >
                        <span className="label">Backend</span>
                        <h3>Service Weaver</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Optimizing core processes with Golang at scale.</p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="section">
                <h2 className="label">Recent Writing</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
                    {latestPosts.map(({ id, date, title, description }) => (
                        <motion.article
                            key={id}
                            variants={itemVariants}
                            whileHover={{ x: 10 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                        >
                            <time style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                            <Link href={`/blog/${id}`}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{title}</h3>
                            </Link>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
                                {description}
                            </p>
                        </motion.article>
                    ))}
                    <Link href="/blog" style={{ textDecoration: 'none' }}>
                        <motion.span
                            variants={itemVariants}
                            style={{ display: 'inline-block', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem', textDecoration: 'underline', color: 'inherit' }}
                        >
                            View all articles &rarr;
                        </motion.span>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
