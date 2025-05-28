import React from 'react';

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

interface UserInfoModalProps {
    user: User;
    onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-lg w-full relative border-2 border-blue-200 dark:border-blue-700 animate-fade-in">
            <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-2xl font-bold hover:text-red-500 dark:hover:text-red-400" onClick={onClose} aria-label="Close">&times;</button>
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
);

export default UserInfoModal;
