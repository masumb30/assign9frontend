'use client';

import { useState, useEffect } from 'react';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import DeleteIdeaModal from './DeleteIdeaModal';
import { useToast } from '@/context/ToastContext';

export default function MyIdeasClient() {
    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { addToast } = useToast();

    const fetchMyIdeas = async () => {
        setIsLoading(true);
        const { data: tokenData } = await authClient.token();
        if (!tokenData?.token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myideas`, {
                headers: {
                    'Authorization': `Bearer ${tokenData.token}`
                }
            });
            const data = await response.json();
            setIdeas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching my ideas:', error);
            addToast({ type: 'error', title: 'Error', message: 'Failed to load your ideas' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyIdeas();
    }, []);

    const handleDelete = async () => {
        if (!deletingId) return;
        setIsDeleting(true);
        const { data: tokenData } = await authClient.token();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${deletingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${tokenData.token}`
                }
            });

            if (response.ok) {
                setIdeas(prev => prev.filter(idea => idea._id !== deletingId));
                addToast({ type: 'success', title: 'Success', message: 'Idea removed from vault' });
                setDeletingId(null);
            } else {
                addToast({ type: 'error', title: 'Error', message: 'Failed to delete idea' });
            }
        } catch (error) {
            console.error('Error deleting idea:', error);
            addToast({ type: 'error', title: 'Error', message: 'Network error' });
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Grid */}
            {ideas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {ideas.map(idea => (
                        <IdeaCard key={idea._id} idea={idea} showActions={true}>
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <Link
                                    href={`/ideas/${idea._id}`}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => setDeletingId(idea._id)}
                                    className="w-12 h-[38px] flex items-center justify-center text-red-500 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition"
                                    title="Delete Idea"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </IdeaCard>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm mx-auto">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Plus className="w-10 h-10 text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-bold dark:text-white mb-2">The Vault is Empty</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto font-medium">
                        You haven't pitched any concepts yet. Start your innovation journey today.
                    </p>
                    <Link
                        href="/add-idea"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition"
                    >
                        Pitch First Idea
                    </Link>
                </div>
            )}

            <DeleteIdeaModal
                isOpen={!!deletingId}
                onClose={() => setDeletingId(null)}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}
