import React, { useState } from 'react';
import UserInfoModal from './UserInfoModal';
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

interface PostCardProps {
    id: number;
    userId: number;
    title: string;
    body: string;
    onDelete: (id: number) => void;
    user: User;
}

const MAX_BODY_LENGTH = 180;

const PostCard: React.FC<PostCardProps> = ({ id, title, body, onDelete, user }) => {
    const [showUser, setShowUser] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const isTruncated = body.length > MAX_BODY_LENGTH;
    const displayBody = isTruncated && !expanded ? body.slice(0, MAX_BODY_LENGTH) + '...' : body;

    return (
        <div className={styles.postCard}>
            <div className={styles.postCardContent}>
                <h2
                    className={styles.postCardTitle}
                    title={title}
                >
                    {title}
                </h2>
                <div className={styles.postCardUserInfo}>
                    <span className={styles.postCardUserName}>{user.name}</span>
                    <span className={styles.postCardUserUsername}>(@{user.username})</span>
                </div>
                <p className={styles.postCardBody}>
                    {displayBody}
                    {isTruncated && (
                        <button
                            className={styles.postCardReadMore}
                            onClick={() => setExpanded(e => !e)}
                            aria-expanded={expanded}
                        >
                            {expanded ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </p>
            </div>
            {/* Action bar */}
            <div className={styles.postCardActions}>
                <button
                    className={styles.postCardUserInfoBtn}
                    onClick={() => setShowUser(true)}
                    title="Show user info"
                    aria-label={`Show info for ${user.name}`}
                >
                    <span role="img" aria-label="info">ℹ️</span> User info
                </button>
                <button
                    className={styles.postCardDeleteBtn}
                    onClick={() => onDelete(id)}
                    title="Delete post"
                    aria-label={`Delete post: ${title}`}
                >
                    <span role="img" aria-label="delete">🗑</span> Delete
                </button>
            </div>
            {/* User modal */}
            {showUser && (
                <UserInfoModal user={user} onClose={() => setShowUser(false)} />
            )}
        </div>
    );
};

export default PostCard;