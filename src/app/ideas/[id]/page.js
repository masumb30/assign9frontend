

import { CommentSection } from '@/components/ideas/CommentSection';
import { ArrowLeft, Calendar, Tag, DollarSign, Users, Info, Rocket, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default async function IdeaDetailsPage({ params }) {
    const { id } = await params;
    console.log('id...................: ', id)
    // fetch idea by id
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);
    const idea = await response.json();
    console.log('single idea: ', idea)

    if (!idea) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Idea not found</h2>
                <button onClick={() => router.push('/ideas')} className="text-blue-600 hover:underline">
                    Return to directory
                </button>
            </div>
        );
    }

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Breadcrumb / Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Vault</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Header Section */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {idea.category}
                                </span>
                                {idea.tags.map(tag => (
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
                                        {idea.author.charAt(0)}
                                    </div>
                                    <span className="font-medium text-slate-900 dark:text-slate-300">{idea.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div
                            className="w-full aspect-video rounded-3xl bg-slate-200 dark:bg-slate-800 bg-cover bg-center shadow-xl"
                            style={{ backgroundImage: `url(${idea.imageUrl})` }}
                        ></div>

                        {/* Core Sections */}
                        <div className="space-y-12">

                            <section>
                                <div className="flex items-center gap-3 mb-4 text-blue-600">
                                    <Info className="w-6 h-6" />
                                    <h2 className="text-2xl font-bold dark:text-white">The Concept</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
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
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {idea.problemStatement}
                                    </p>
                                </section>
                                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4 text-emerald-500">
                                        <Rocket className="w-6 h-6" />
                                        <h3 className="text-xl font-bold">The Solution</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {idea.proposedSolution}
                                    </p>
                                </section>
                            </div>

                        </div>

                        {/* Interaction System */}
                        <CommentSection ideaId={idea.id} comments={idea.comments} />

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

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
                                <h3 className="font-bold mb-4">Want to collaborate?</h3>
                                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                    The founder of this concept is looking for co-founders and early testers. Send a pitch deck or portfolio to start the conversation.
                                </p>
                                <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition">
                                    Request Connection
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
