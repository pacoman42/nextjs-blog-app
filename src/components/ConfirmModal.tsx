import React, { useEffect, useRef } from 'react';
import styles from '../styles/ui.module.css';

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
    <div className={styles.confirmModalOverlay}>
      <div className={styles.confirmModal}>
        <button className={styles.confirmModalCloseBtn} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className={styles.confirmModalTitle}>Confirm Deletion</h2>
        <p className={styles.confirmModalText}>
          {postTitle ? (
            <>Are you sure you want to delete the post <span className={styles.confirmModalTextHighlight}>‘{postTitle}’</span>?<br />This action cannot be undone.</>
          ) : (
            <>Are you sure you want to delete this post? This action cannot be undone.</>
          )}
        </p>
        <div className={styles.confirmModalActions}>
          <button
            ref={cancelRef}
            className={styles.confirmModalCancelBtn}
            onClick={onClose}
            tabIndex={0}
          >
            <span role="img" aria-label="cancel">❌</span> Cancel
          </button>
          <button
            className={styles.confirmModalDeleteBtn}
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