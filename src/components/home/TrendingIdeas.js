


import { IdeaCard } from '@/components/ideas/IdeaCard';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';

export async function TrendingIdeas() {
    // fetch trending ideas from the rest api
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`);
    const ideas = await response.json();

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-500 font-bold tracking-wide uppercase text-sm mb-3">
                            <Flame className="w-5 h-5 fill-current" />
                            <span>Trending Concepts</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Discover Tomorrow's Unicorns
                        </h2>
                    </div>
                    <Link
                        href="/ideas"
                        className="inline-flex items-center gap-2 group text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition"
                    >
                        View All Vaults
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {ideas.map(idea => (
                        <IdeaCard key={idea._id} idea={idea} />
                    ))}
                </div>

            </div>
        </section>
    );
}
