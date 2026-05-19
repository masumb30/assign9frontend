'use client';

import { useIdeas } from '@/context/IdeaContext';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { useState } from 'react';
import { Edit3, Trash2, LayoutGrid, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MyIdeasPage() {
    const { getMyIdeas, deleteIdea, updateIdea } = useIdeas();
    const myIdeas = getMyIdeas();

    const [editingIdea, setEditingIdea] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Simple Edit Modal Form State
    const [editForm, setEditForm] = useState({
        title: '',
        shortDesc: ''
    });

    const handleOpenEdit = (idea) => {
        setEditingIdea(idea);
        setEditForm({
            title: idea.title,
            shortDesc: idea.shortDesc
        });
    };

    const handleSaveEdit = () => {
        updateIdea(editingIdea.id, editForm);
        setEditingIdea(null);
    };

    const handleDeleteConfirm = () => {
        deleteIdea(deletingId);
        setDeletingId(null);
    };

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <LayoutGrid className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                My Vault
                            </h1>
                        </div>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                            Manage your submitted startup concepts and track community feedback.
                        </p>
                    </div>
                    <Link
                        href="/add-idea"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        New Concept
                    </Link>
                </div>

                {/* Grid */}
                {myIdeas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {myIdeas.map(idea => (
                            <IdeaCard key={idea.id} idea={idea} showActions={true}>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => handleOpenEdit(idea)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setDeletingId(idea.id)}
                                        className="w-12 flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </IdeaCard>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white mb-2">The Vault is Empty</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                            You haven't pitched any concepts yet. Start your innovation journey today.
                        </p>
                        <Link
                            href="/add-idea"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl"
                        >
                            Pitch First Idea
                        </Link>
                    </div>
                )}

                {/* MODALS (Simplified for Mock) */}

                {/* Update Modal */}
                {editingIdea && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setEditingIdea(null)}></div>
                        <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-2xl font-black mb-6">Update Concept</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 ml-1">Title</label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 ml-1">Pitch Hook</label>
                                    <textarea
                                        value={editForm.shortDesc}
                                        onChange={(e) => setEditForm({ ...editForm, shortDesc: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setEditingIdea(null)} className="flex-1 py-3 text-sm font-bold text-slate-500">Cancel</button>
                                    <button onClick={handleSaveEdit} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation */}
                {deletingId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setDeletingId(null)}></div>
                        <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h2 className="text-xl font-black mb-2">Wipe from Vault?</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                                This action is permanent. All engagement and validation data for this concept will be lost.
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setDeletingId(null)} className="flex-1 py-3 text-sm font-bold text-slate-500">Keep It</button>
                                <button onClick={handleDeleteConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Delete Forever</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
