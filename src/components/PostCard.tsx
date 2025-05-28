import React from 'react';

interface PostCardProps {
    id: number;
    userId: number;
    title: string;
    body: string;
    onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, onDelete, userId }) => {
    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-full border border-gray-200 hover:shadow-2xl transition-shadow duration-200">
            <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span><strong>ID:</strong> {id}</span>
                    <span><strong>UserID:</strong> {userId}</span>
                </div>
                <h2 className="font-bold text-xl mb-2 text-gray-800 truncate" title={title}>{title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{body}</p>
            </div>
            <button 
                onClick={handleDelete} 
                className="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 shadow"
            >
                Delete
            </button>
        </div>
    );
};

export default PostCard;