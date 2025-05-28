import { useEffect, useState, useRef } from 'react';
import PostCard from '../components/PostCard';
import ConfirmModal from '../components/ConfirmModal';
import styles from '../styles/ui.module.css';

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
    <div className={styles.postsPageContainer}>
      {error && (
        <div className={styles.postsPageError}>
          {error}
        </div>
      )}
      <div className={styles.postsPageHeader}>
        <div className={styles.postsPageHeaderRow}>
          <h1 className={styles.postsPageTitle}>
            Posts
          </h1>
          <div className={styles.postsPageFiltersWrapper}>
            <div className={styles.postsPageFilters}>
              <span className={styles.postsPageFiltersLabel}>Filters</span>
              {/* Post title */}
              <div className={styles.postsPageFilterField}>
                <label className={styles.postsPageFilterLabel}>Post title</label>
                <input
                  type="text"
                  placeholder="Post title"
                  className={styles.postsPageFilterInput}
                  value={pendingTitle}
                  onChange={e => setPendingTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>
              {/* User Name */}
              <div className={styles.postsPageFilterField}>
                <label className={styles.postsPageFilterLabel}>User Name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  className={styles.postsPageFilterInput}
                  value={pendingUserName}
                  onChange={e => setPendingUserName(e.target.value)}
                  autoComplete="off"
                />
              </div>
              {/* Nickname */}
              <div className={styles.postsPageFilterField}>
                <label className={styles.postsPageFilterLabel}>Nickname</label>
                <input
                  type="text"
                  placeholder="Nickname"
                  className={styles.postsPageFilterInput}
                  value={pendingUserUsername}
                  onChange={e => setPendingUserUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <p className={styles.postsPageSubtitle}>Explore, filter and manage posts with a modern UI.</p>
      </div>
      <div className={`${styles.postsPageList} post-list`}>
        {paginatedPosts.length === 0 ? (
          <div className={styles.postsPageNoPosts}>
            No posts found for the selected filters.
          </div>
        ) : (
          paginatedPosts.map(post => (
            <div key={post.id} className={styles.postsPageListItem}>
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
      <div className={styles.postsPagePaginationWrapper}>
        <div className={styles.postsPagePagination}>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={styles.postsPagePaginationBtn}
            disabled={currentPage === 1}
            aria-label="Anterior"
          >
            &larr;
          </button>
          {getPageNumbers().map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`${styles.postsPagePaginationBtn} ${currentPage === pageNum ? styles.postsPagePaginationBtnActive : ''}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className={styles.postsPagePaginationBtn}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Siguiente"
          >
            &rarr;
          </button>
        </div>
        <div className={styles.postsPagePaginationInfo}>
          Page <span className={styles.postsPagePaginationInfoCurrent}>{currentPage}</span> of <span className={styles.postsPagePaginationInfoTotal}>{totalPages || 1}</span> &mdash; {filteredPosts.length} posts
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