'use client';

import { useState } from 'react';
import { CommentSection } from '@/components/ideas/CommentSection';
import { ArrowLeft, Calendar, Tag, DollarSign, Users, Info, Rocket, BrainCircuit, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import EditIdeaModal from './EditIdeaModal';
import { useToast } from '@/context/ToastContext';

export default function IdeaDetailsContent({ initialIdea, session }) {
    const [idea, setIdea] = useState(initialIdea);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { addToast } = useToast();
    const user = session?.user;
    const isAuthor = user?.id === idea.authorId;

    const handleUpdateIdea = async (updatedFields) => {
        const { data } = await authClient.token();
        if (!data?.token) {
            addToast({ type: 'error', title: 'Error', message: "Authentication required" });
            return false;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${idea._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                },
                body: JSON.stringify(updatedFields)
            });

            if (response.ok) {
                const result = await response.json();
                setIdea(result);
                addToast({ type: 'success', title: 'Success', message: "Idea updated successfully" });
                return true;
            } else {
                addToast({ type: 'error', title: 'Error', message: "Failed to update idea" });
                return false;
            }
        } catch (error) {
            console.error('Error updating idea:', error);
            addToast({ type: 'error', title: 'Error', message: "Network error. Please try again." });
            return false;
        }
    };


    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Breadcrumb & Actions */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/ideas"
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Vault</span>
                    </Link>

                    {isAuthor && (
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm group"
                        >
                            <Edit2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                            <span>Edit Idea</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Header Section */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {idea.category}
                                </span>
                                {(Array.isArray(idea?.tags) ? idea.tags : []).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg">
                                        #{tag}
                                    </span>
                                ))}

                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                                {idea.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                                        {idea?.author?.charAt(0)}
                                    </div>
                                    <span className="font-medium text-slate-900 dark:text-slate-300">{idea?.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                                    {idea.updatedAt && idea.updatedAt !== idea.createdAt && (
                                        <span className="text-xs italic bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded ml-2">Updated</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div
                            className="w-full aspect-video rounded-3xl bg-slate-200 dark:bg-slate-800 bg-cover bg-center shadow-xl border border-slate-200 dark:border-slate-800"
                            style={{ backgroundImage: idea.imageUrl ? `url(${idea.imageUrl})` : 'none' }}
                        >
                            {!idea.imageUrl && (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    No Image Provided
                                </div>
                            )}
                        </div>

                        {/* Core Sections */}
                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-4 text-blue-600">
                                    <Info className="w-6 h-6" />
                                    <h2 className="text-2xl font-bold dark:text-white">The Concept</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                        {idea.longDesc}
                                    </p>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4 text-rose-500">
                                        <BrainCircuit className="w-6 h-6" />
                                        <h3 className="text-xl font-bold">The Problem</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                        {idea.problemStatement}
                                    </p>
                                </section>
                                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4 text-emerald-500">
                                        <Rocket className="w-6 h-6" />
                                        <h3 className="text-xl font-bold">The Solution</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                        {idea.proposedSolution}
                                    </p>
                                </section>
                            </div>
                        </div>

                        {/* Interaction System */}
                        <CommentSection ideaId={idea._id} />

                    </div>

                    {/* Sidebar / Quick Stats */}
                    <div className="space-y-8">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Overview</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                                            <DollarSign className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Budget Est.</p>
                                            <p className="font-bold dark:text-white">{idea.estimatedBudget}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Target Audience</p>
                                            <p className="font-bold dark:text-white">{idea.targetAudience}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition-all">
                                        Upvote This Concept
                                    </button>
                                    <p className="text-center text-xs text-slate-500 mt-4">
                                        Join {idea.likes} others who validate this idea.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditIdeaModal
                key={`${idea._id}-${isEditModalOpen}`}
                idea={idea}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateIdea}
            />
        </div>
    );
}
