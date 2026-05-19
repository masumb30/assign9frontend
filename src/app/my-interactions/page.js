'use client';

import { useIdeas } from '@/context/IdeaContext';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { History, MessageSquare, ArrowUpCircle, Ghost } from 'lucide-react';
import Link from 'next/link';

export default function MyInteractionsPage() {
    const { getMyInteractions } = useIdeas();
    const interactions = getMyInteractions();

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <History className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Interactions History
                        </h1>
                    </div>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                        Review the concepts you've validated, discussed, or engaged with across the platform.
                    </p>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3 text-blue-600 mb-2">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-3xl font-black">{interactions.length}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Discussions</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm opacity-50">
                        <div className="flex items-center gap-3 text-emerald-600 mb-2">
                            <ArrowUpCircle className="w-5 h-5" />
                            <span className="text-3xl font-black">12</span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Upvotes Cast</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm opacity-50">
                        <div className="flex items-center gap-3 text-purple-600 mb-2">
                            <History className="w-5 h-5" />
                            <span className="text-3xl font-black">42</span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Vaults Viewed</p>
                    </div>
                </div>

                {/* List of interacted ideas */}
                {interactions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {interactions.map(idea => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Ghost className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white mb-2">No Recent Interactions</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                            You haven't commented on any other concepts yet. Community validation is a two-way street!
                        </p>
                        <Link
                            href="/ideas"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl"
                        >
                            Browse Ideas
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
