import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-900 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 drop-shadow-lg">Welcome to the Blog App</h1>
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-200 max-w-xl text-center">
        Discover, filter and explore posts from different users. Enjoy a modern, smooth and interactive experience!
      </p>
      <Link href="/posts" legacyBehavior>
        <a className="px-8 py-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200">
          Go to Posts &rarr;
        </a>
      </Link>
      <div className="mt-16 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 text-sm opacity-80">
        <span>Built with Next.js, TypeScript, Prisma & Tailwind CSS</span>
        <span>Fast, responsive and user-friendly</span>
      </div>
    </div>
  );
};

export default Home;