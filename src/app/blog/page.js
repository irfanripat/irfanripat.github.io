import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export default function BlogListing() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="section">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Writing</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Thoughts on software engineering, productivity, and life.
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {allPostsData.map(({ id, date, title, description }) => (
                    <article key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <time style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <Link href={`/blog/${id}`}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--secondary-black)' }}>{title}</h2>
                        </Link>
                        <p style={{ color: 'var(--text-main)', maxWidth: '600px' }}>{description}</p>
                        <Link href={`/blog/${id}`} style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'underline', marginTop: '0.5rem' }}>
                            Read Article &rarr;
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
