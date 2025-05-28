import React, { useState } from 'react';
import UserInfoModal from './UserInfoModal';

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
        <div className="relative flex flex-col justify-between h-full rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-800 transition-shadow duration-200 hover:shadow-xl animate-fade-in">
            <div className="p-6 pb-4 flex-1">
                <h2
                    className="font-bold text-lg md:text-xl text-blue-800 dark:text-blue-200 leading-tight mb-1 break-words whitespace-pre-line line-clamp-2"
                    title={title}
                >
                    {title}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-600 dark:text-blue-300 text-base md:text-lg">{user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">(@{user.username})</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-2">
                    {displayBody}
                    {isTruncated && (
                        <button
                            className="ml-2 text-blue-600 dark:text-blue-400 underline text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition"
                            onClick={() => setExpanded(e => !e)}
                            aria-expanded={expanded}
                        >
                            {expanded ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </p>
            </div>
            {/* Action bar */}
            <div className="flex items-center justify-between gap-2 px-6 py-3 border-t border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 rounded-b-2xl">
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold text-xs shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-150 hover:scale-105"
                    onClick={() => setShowUser(true)}
                    title="Show user info"
                    aria-label={`Show info for ${user.name}`}
                >
                    <span role="img" aria-label="info">ℹ️</span> User info
                </button>
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-red-400 text-red-600 dark:text-red-400 font-semibold text-xs bg-white dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition-transform duration-150"
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