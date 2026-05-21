'use client';

import { useState, useEffect } from 'react';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { History, MessageSquare, ArrowUpCircle, Ghost, Zap } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function MyInteractionsPage() {
    const [interactions, setInteractions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInteractions = async () => {
        setIsLoading(true);
        const { data: tokenData } = await authClient.token();
        if (!tokenData?.token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interaction`, {
                headers: {
                    'Authorization': `Bearer ${tokenData.token}`
                }
            });
            const data = await response.json();
            setInteractions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching interactions:', error);
            setInteractions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInteractions();
    }, []);

    return (
        <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4 text-emerald-600">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                                <History className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                                Interactions
                            </h1>
                        </div>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                            Review the concepts you've validated, discussed, or engaged with across the platform.
                        </p>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    <StatCard
                        icon={MessageSquare}
                        value={interactions.length}
                        label="Discussions"
                        color="blue"
                    />
                    <StatCard
                        icon={Zap}
                        value={Math.floor(interactions.length * 1.5)}
                        label="Impact Points"
                        color="emerald"
                        active={false}
                    />
                    <StatCard
                        icon={ArrowUpCircle}
                        value={0}
                        label="Contributions"
                        color="purple"
                        active={false}
                    />
                </div>

                {/* List of interacted ideas */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin"></div>
                    </div>
                ) : interactions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {interactions.map(idea => (
                            <IdeaCard key={idea._id || idea.id} idea={idea} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Ghost className="w-12 h-12 text-slate-300" />
                        </div>
                        <h2 className="text-3xl font-black dark:text-white mb-4">Quiet in the Vault</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto font-medium">
                            You haven't commented on any other concepts yet. Community validation is a two-way street!
                        </p>
                        <Link
                            href="/ideas"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/25 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                        >
                            Explore Concepts
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

const StatCard = ({ icon: Icon, value, label, color, active = true }) => {
    const colorClasses = {
        blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10',
        emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10',
        purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10',
    };

    return (
        <div className={`p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md ${!active && 'opacity-50 grayscale'}`}>
            <div className={`p-3 w-fit rounded-2xl mb-6 ${colorClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className="text-4xl font-black text-slate-900 dark:text-white mb-1">{value}</span>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</p>
            </div>
        </div>
    );
};

