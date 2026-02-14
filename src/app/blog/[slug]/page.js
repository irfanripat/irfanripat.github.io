import { getPostData, getAllPostIds } from '@/lib/markdown';

export async function generateStaticParams() {
    const posts = getAllPostIds();
    return posts.map((post) => ({
        slug: post.params.slug,
    }));
}

export default async function Post({ params }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <div className="section">
            <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                <a href="/blog" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>
                    &larr; Back to Writing
                </a>
                <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1rem' }}>{postData.title}</h1>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <time>{new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span>&middot;</span>
                    <span>{postData.tags?.join(', ')}</span>
                </div>
            </header>

            <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
        </div>
    );
}
