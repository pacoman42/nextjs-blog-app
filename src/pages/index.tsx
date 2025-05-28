import Link from 'next/link';
import styles from '../styles/ui.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Welcome to the Blog App</h1>
      <p className={styles.homeSubtitle}>
        Discover, filter and explore posts from different users. Enjoy a modern, smooth and interactive experience!
      </p>
      <Link href="/posts" legacyBehavior>
        <a className={styles.homePostsBtn}>
          Go to Posts &rarr;
        </a>
      </Link>
      <div className={styles.homeFooter}>
        <span>Built with Next.js, TypeScript, Prisma & Tailwind CSS</span>
        <span>Fast, responsive and user-friendly</span>
      </div>
    </div>
  );
};

export default Home;