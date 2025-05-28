import React, { useState } from 'react';

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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-lg w-full relative border-2 border-blue-200 dark:border-blue-700 animate-fade-in">
                        <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-2xl font-bold hover:text-red-500 dark:hover:text-red-400" onClick={() => setShowUser(false)} aria-label="Close">&times;</button>
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            {/* Avatar */}
                            <div className="flex flex-col items-center md:items-start min-w-[80px] md:justify-start">
                                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3 border-2 border-blue-400 dark:border-blue-600">
                                    <svg className="w-12 h-12 text-blue-400 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.125a7.125 7.125 0 0114.248 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.875z" /></svg>
                                </div>
                            </div>
                            {/* Main info + secondary info alineados arriba */}
                            <div className="flex-1 flex flex-col md:flex-row gap-4">
                                {/* Main info */}
                                <div className="flex-1 flex flex-col justify-start">
                                    <div className="font-bold text-xl text-blue-700 dark:text-blue-300 mb-1">{user.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">@{user.username}</div>
                                    <a href={`mailto:${user.email}`} className="block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mb-1">{user.email}</a>
                                    {user.phone && <div className="text-sm text-gray-700 dark:text-gray-200">{user.phone}</div>}
                                </div>
                                {/* Secondary info alineado arriba */}
                                <div className="flex-1 flex flex-col gap-2 justify-start">
                                    {user.company && (
                                        <div className="text-sm">
                                            <span className="font-semibold text-gray-700 dark:text-gray-200">Company:</span>{' '}
                                            <span className="text-gray-800 dark:text-gray-100">{user.company.name || JSON.stringify(user.company)}</span>
                                        </div>
                                    )}
                                    {user.address && (
                                        <div className="text-sm">
                                            <span className="font-semibold text-gray-700 dark:text-gray-200">Address:</span>{' '}
                                            <span className="text-gray-800 dark:text-gray-100">
                                                {user.address.street ? `${user.address.street}, ${user.address.city}` : JSON.stringify(user.address)}
                                            </span>
                                        </div>
                                    )}
                                    {user.website && (
                                        <a
                                            href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                                        >
                                            {user.website}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;