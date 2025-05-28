import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Blog App</h1>
      <p className="mb-8">Explore posts and share your thoughts!</p>
      <Link href="/posts">
          View Posts        
      </Link>
    </div>
  );
};

export default Home;