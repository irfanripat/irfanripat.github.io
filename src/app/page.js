import { getSortedPostsData } from '@/lib/markdown';
import AnimatedHome from '@/components/AnimatedHome';

export default function Home() {
  const latestPosts = getSortedPostsData().slice(0, 3);

  return <AnimatedHome latestPosts={latestPosts} />;
}
