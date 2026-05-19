'use client';

import { useState } from 'react';
import { useIdeas } from '@/context/IdeaContext';
import { User, Send, Edit2, Trash2, Check, X, Clock } from 'lucide-react';

export function CommentSection({ ideaId, comments }) {
    const { addComment, editComment, deleteComment, mockUser } = useIdeas();
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addComment(ideaId, newComment);
        setNewComment('');
    };

    const handleStartEdit = (comment) => {
        setEditingId(comment.id);
        setEditText(comment.text);
    };

    const handleSaveEdit = (commentId) => {
        if (!editText.trim()) return;
        editComment(ideaId, commentId, editText);
        setEditingId(null);
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
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600">
                                    {comment.userName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                        {comment.userName}
                                        {comment.userId === mockUser.id && (
                                            <span className="ml-2 text-[10px] font-black uppercase tracking-widest bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">You</span>
                                        )}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                        {comment.isEdited && <span>(edited)</span>}
                                    </div>
                                </div>
                            </div>

                            {comment.userId === mockUser.id && editingId !== comment.id && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleStartEdit(comment)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 transition"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteComment(ideaId, comment.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {editingId === comment.id ? (
                            <div className="space-y-3">
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                                />
                                <div className="flex items-center gap-2 justify-end">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="p-2 text-slate-500 hover:text-slate-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleSaveEdit(comment.id)}
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {comment.text}
                            </p>
                        )}
                    </div>
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
