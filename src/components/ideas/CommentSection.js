'use client';

import { useState, useEffect } from 'react';
import { useIdeas } from '@/context/IdeaContext';
import { User, Send, Edit2, Trash2, Check, X, Clock } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { CommentCard } from './CommentCard';

export function CommentSection({ ideaId }) {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${ideaId}`);
            const data = await response.json();
            console.log("comments data: ", data)
            setComments(Array.isArray(data) ? data : []);
        };
        fetchComments();
    }, [ideaId]);

    // write a post fetch request to add a comment
    const addComment = async (ideaId, comment) => {
        const { data, error } = await authClient.token()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${ideaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`,
            },
            body: JSON.stringify({ comment }),
        });
        const comments = await response.json();
        setComments(Array.isArray(comments) ? comments : []);
    };

    const editComment = async (ideaId, commentId, comment) => {
        const { data, error } = await authClient.token()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}/${ideaId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`,
            },
            body: JSON.stringify({ comment }),
        });
        if (response.ok) {
            const updatedComments = await response.json();
            setComments(Array.isArray(updatedComments) ? updatedComments : []);
            return true;
        }
        return false;
    };

    const deleteComment = async (ideaId, commentId) => {
        const { data, error } = await authClient.token()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}/${ideaId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${data.token}`,
            },
        });
        if (response.ok) {
            const updatedComments = await response.json();
            setComments(Array.isArray(updatedComments) ? updatedComments : []);
            return true;
        }
        return false;
    };


    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addComment(ideaId, newComment);
        setNewComment('');
    };





    return (
        <div className="mt-12 lg:mt-16 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                Discussion ({comments.length})
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="mb-10 group">
                <div className="relative">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts or suggest an improvement..."
                        className="w-full min-h-[120px] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white resize-none shadow-sm"
                    />
                    <button
                        type="submit"
                        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition shadow-lg flex items-center gap-2 px-4 py-2 font-medium"
                    >
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                    </button>
                </div>
            </form>

            {/* Comment List */}
            <div className="space-y-6">
                {comments?.map((comment) => (
                    <CommentCard
                        key={comment._id}
                        comment={comment}
                        user={user}
                        ideaId={ideaId}
                        onEdit={editComment}
                        onDelete={deleteComment}
                    />
                ))}
                {comments.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500">No discussions yet. Be the first to provide feedback!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
