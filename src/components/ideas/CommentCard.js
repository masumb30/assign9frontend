'use client'
import { User, Send, Edit2, Trash2, Check, X, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function CommentCard({ comment, user, ideaId, onEdit, onDelete }) {
    if (!comment) return null;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editText, setEditText] = useState(comment.comment);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSaveEdit = async () => {
        if (!editText.trim()) return;
        setIsUpdating(true);
        const success = await onEdit(ideaId, comment._id, editText);
        if (success) {
            setIsEditModalOpen(false);
        }
        setIsUpdating(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await onDelete(ideaId, comment._id);
        if (success) {
            setIsDeleteModalOpen(false);
        }
        setIsDeleting(false);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600">
                        {comment.author.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {comment.author}
                            {comment.authorId === user?.id && (
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

                {comment.authorId === user?.id && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 transition"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {comment.comment}
            </p>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Comment</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full min-h-[150px] p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white resize-none transition-all"
                                placeholder="Edit your comment..."
                            />

                            <div className="flex items-center gap-3 justify-end mt-6">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={isUpdating || !editText.trim() || editText === comment.comment}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
                                >
                                    {isUpdating ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Check className="w-4 h-4" />
                                    )}
                                    <span>{isUpdating ? 'Updating...' : 'Save Changes'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <Trash2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Comment</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">This action cannot be undone.</p>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 italic text-sm mb-6">
                                "{comment.comment}"
                            </p>

                            <div className="flex items-center gap-3 justify-end">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                                >
                                    No, Keep it
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-red-500/20"
                                >
                                    {isDeleting ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
