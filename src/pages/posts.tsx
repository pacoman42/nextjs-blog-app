import { useEffect, useState, useRef } from 'react';
import PostCard from '../components/PostCard';
import ConfirmModal from '../components/ConfirmModal';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  address?: any;
  company?: any;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: User;
}

const POSTS_PER_PAGE = 9;

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userNameFilter, setUserNameFilter] = useState('');
  const [userUsernameFilter, setUserUsernameFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');

  // Filtros temporales para el formulario
  const [pendingUserName, setPendingUserName] = useState('');
  const [pendingUserUsername, setPendingUserUsername] = useState('');
  const [pendingTitle, setPendingTitle] = useState('');

  // Debounce refs
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
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
      let filtered = updatedPosts;
      if (userNameFilter) filtered = filtered.filter(post => post.user.name.toLowerCase().includes(userNameFilter.toLowerCase()));
      if (userUsernameFilter) filtered = filtered.filter(post => post.user.username.toLowerCase().includes(userUsernameFilter.toLowerCase()));
      if (titleFilter) filtered = filtered.filter(post => post.title.toLowerCase().includes(titleFilter.toLowerCase()));
      const newTotalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        setCurrentPage(1);
      } else if (filtered.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    }
  };

  // Al aplicar filtros, se copian los valores temporales a los filtros reales
  const applyFilters = () => {
    setUserNameFilter(pendingUserName);
    setUserUsernameFilter(pendingUserUsername);
    setTitleFilter(pendingTitle);
    setCurrentPage(1);
  };

  // Sincroniza los filtros visuales con los activos al cargar
  useEffect(() => {
    setPendingUserName(userNameFilter);
    setPendingUserUsername(userUsernameFilter);
    setPendingTitle(titleFilter);
  }, [userNameFilter, userUsernameFilter, titleFilter]);

  // Debounce para aplicar filtros automáticamente
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setUserNameFilter(pendingUserName);
      setUserUsernameFilter(pendingUserUsername);
      setTitleFilter(pendingTitle);
      setCurrentPage(1);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingUserName, pendingUserUsername, pendingTitle]);

  // Filtros
  let filteredPosts = posts;
  if (userNameFilter) filteredPosts = filteredPosts.filter(post => post.user.name.toLowerCase().includes(userNameFilter.toLowerCase()));
  if (userUsernameFilter) filteredPosts = filteredPosts.filter(post => post.user.username.toLowerCase().includes(userUsernameFilter.toLowerCase()));
  if (titleFilter) filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(titleFilter.toLowerCase()));

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const postList = document.querySelector('.post-list');
    if (postList) {
      const y = postList.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Carrusel de páginas (máx 5 visibles)
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) return Array.from({ length: totalPages }, (_, i) => i + 1);
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) start = Math.max(1, end - maxPagesToShow + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300 text-center font-semibold">
          {error}
        </div>
      )}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow">
            Posts
          </h1>
          {/* Filtros estáticos, alineados a la derecha en desktop */}
          <div className="w-full md:w-auto">
            <div className="bg-white/80 dark:bg-gray-800 rounded-xl shadow border border-blue-200 dark:border-blue-700 px-4 py-3 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
              <span className="text-base font-semibold text-blue-700 mb-2 sm:mb-0 sm:mr-2 self-start sm:self-center">Filters</span>
              {/* Post title */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs font-semibold text-blue-700 mb-1">Post title</label>
                <input
                  type="text"
                  placeholder="Post title"
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
                  value={pendingTitle}
                  onChange={e => setPendingTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>
              {/* User Name */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs font-semibold text-blue-700 mb-1">User Name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
                  value={pendingUserName}
                  onChange={e => setPendingUserName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              {/* Nickname */}
              <div className="flex-1 flex flex-col min-w-[120px]">
                <label className="text-xs font-semibold text-blue-700 mb-1">Nickname</label>
                <input
                  type="text"
                  placeholder="Nickname"
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
                  value={pendingUserUsername}
                  onChange={e => setPendingUserUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-lg mb-6">Explore, filter and manage posts with a modern UI.</p>
        {/* ...existing code... */}
      </div>
      <div className="post-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500 dark:text-gray-400 py-12 animate-fade-in">
            No posts found for the selected filters.
          </div>
        ) : (
          paginatedPosts.map(post => (
            <div key={post.id} className="animate-fade-in">
              <PostCard
                id={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
                user={post.user}
                onDelete={handleDeleteClick}
              />
            </div>
          ))
        )}
      </div>
      {/* Paginación compacta */}
      <div className="flex flex-col items-center mt-10 gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className="px-3 py-2 rounded-full font-semibold shadow transition-all duration-150 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50"
            disabled={currentPage === 1}
            aria-label="Anterior"
          >
            &larr;
          </button>
          {getPageNumbers().map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded-full font-semibold shadow transition-all duration-150 ${
                currentPage === pageNum
                  ? 'bg-blue-600 dark:bg-blue-500 text-white scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
              }`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className="px-3 py-2 rounded-full font-semibold shadow transition-all duration-150 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-50"
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Siguiente"
          >
            &rarr;
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages || 1}</span> &mdash; {filteredPosts.length} posts
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        postTitle={posts.find(p => p.id === postToDelete)?.title}
      />
    </div>
  );
};

export default PostsPage;