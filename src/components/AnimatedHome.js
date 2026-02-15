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
                <h2 className="label">Work Experience</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2rem' }}>

                    {/* TIX ID */}
                    <motion.div
                        variants={itemVariants}
                        style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '2rem', alignItems: 'start' }}
                    >
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, paddingTop: '0.25rem' }}>
                            2024 — 2025
                        </span>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Backend Engineer • TIX ID
                                <a href="https://www.tix.id" target="_blank" style={{ fontSize: '1rem', opacity: 0.6 }}>↗</a>
                            </h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                Built and maintained scalable backend services for movie and food ordering platforms. Refactored legacy systems, designed HLD documents, and enhanced deployment efficiency across multi-team codebases.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Go</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>PostgreSQL</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Redis</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>RabbitMQ</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Docker</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Waresix */}
                    <motion.div
                        variants={itemVariants}
                        style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '2rem', alignItems: 'start' }}
                    >
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, paddingTop: '0.25rem' }}>
                            2022 — 2024
                        </span>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Backend Engineer • Waresix
                                <a href="https://www.waresix.com" target="_blank" style={{ fontSize: '1rem', opacity: 0.6 }}>↗</a>
                            </h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                Developed and optimized backend services for logistics operations. Applied TDD practices, improved API performance, and contributed to scaling large backend systems while enhancing maintainability.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Go</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>PostgreSQL</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>MongoDB</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Redis</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Kafka</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}>Docker</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Resume Link */}
                    <motion.a
                        href="/cv_irfan_ripat.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariants}
                        style={{
                            display: 'inline-block',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            marginTop: '2rem',
                            textDecoration: 'underline',
                            color: 'inherit'
                        }}
                    >
                        View Full Résumé &rarr;
                    </motion.a>

                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="section">
                <h2 className="label">Writing</h2>
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
