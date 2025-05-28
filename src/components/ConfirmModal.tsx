import React, { useEffect, useRef } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, postTitle }) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-200 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-2 border-blue-200 dark:border-blue-700 relative scale-100 animate-fade-in">
        <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-2xl font-bold hover:text-red-500 dark:hover:text-red-400" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 mb-2 text-center">Confirm Deletion</h2>
        <p className="text-gray-700 dark:text-gray-200 text-center mb-6">
          {postTitle ? (
            <>Are you sure you want to delete the post <span className="font-semibold text-blue-700 dark:text-blue-300">‘{postTitle}’</span>?<br />This action cannot be undone.</>
          ) : (
            <>Are you sure you want to delete this post? This action cannot be undone.</>
          )}
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            ref={cancelRef}
            className="px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClose}
            tabIndex={0}
          >
            <span role="img" aria-label="cancel">❌</span> Cancel
          </button>
          <button
            className="px-6 py-2 rounded-full bg-red-600 dark:bg-red-500 text-white font-bold shadow hover:bg-red-700 dark:hover:bg-red-600 transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={onConfirm}
            tabIndex={1}
          >
            <span role="img" aria-label="delete">🗑</span> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;