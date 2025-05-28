import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import ConfirmModal from '../components/ConfirmModal';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const POSTS_PER_PAGE = 9;

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userIdFilter, setUserIdFilter] = useState<string>('');
  const [userIds, setUserIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
        // Extraer userIds únicos para el filtro
        setUserIds(Array.from(new Set(data.map(p => p.userId))).sort((a, b) => a - b));
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error');
      }
    };
    fetchPosts();
  }, []);

  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId);
    setIsModalOpen(true);
  };
const confirmDelete = async () => {
  if (postToDelete === null) return;
  try {
    const response = await fetch(`/api/${postToDelete}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    const updatedPosts = posts.filter(post => post.id !== postToDelete);
    setPosts(updatedPosts);
    setIsModalOpen(false);
    setPostToDelete(null);

    // Ajustar currentPage si es necesario
    const filtered = userIdFilter
      ? updatedPosts.filter(post => post.userId === Number(userIdFilter))
      : updatedPosts;
    const newTotalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }
  } catch (err) {
    if (err instanceof Error) setError(err.message);
    else setError('Unknown error');
  }
};

  // Filtro y paginado
  const filteredPosts = userIdFilter
    ? posts.filter(post => post.userId === Number(userIdFilter))
    : posts;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const postList = document.querySelector('.post-list');
    if (postList) {
      const y = postList.getBoundingClientRect().top + window.scrollY - 20; // Ajusta el offset si tienes header fijo
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="error text-red-600 mb-2">{error}</p>}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <label className="font-semibold">Filtrar por usuario:</label>
        <select
          className="border rounded px-2 py-1"
          value={userIdFilter}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          {userIds.map(uid => (
            <option key={uid} value={uid}>{uid}</option>
          ))}
        </select>
      </div>
      <div className="post-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPosts.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
      {/* Paginado */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default PostsPage;