'use client';

import { useState, useMemo } from 'react';
import { useIdeas } from '@/context/IdeaContext';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { SearchFilterSuite } from '@/components/ideas/SearchFilterSuite';
import { Lightbulb, Ghost } from 'lucide-react';

export default function IdeasPage() {
    const { ideas } = useIdeas();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [dateRange, setDateRange] = useState('latest');

    const filteredIdeas = useMemo(() => {
        let result = [...ideas];

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(idea =>
                idea.title.toLowerCase().includes(query) ||
                idea.shortDesc.toLowerCase().includes(query) ||
                idea.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Category Filter
        if (category !== 'All') {
            result = result.filter(idea => idea.category === category);
        }

        // Sort
        if (dateRange === 'latest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (dateRange === 'oldest') {
            result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (dateRange === 'trending') {
            result.sort((a, b) => b.likes + b.comments.length - (a.likes + a.comments.length));
        }

        return result;
    }, [ideas, searchQuery, category, dateRange]);

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Idea Vaults
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Explore the latest innovations and startup concepts from the community.
                        Filter by category or search for specific technologies.
                    </p>
                </div>

                {/* Filter Suite */}
                <SearchFilterSuite
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    category={category}
                    setCategory={setCategory}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />

                {/* Grid */}
                {filteredIdeas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredIdeas.map(idea => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <Ghost className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No concepts found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                            We couldn't find any ideas matching your current filters. Try adjusting your search or category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setCategory('All');
                            }}
                            className="mt-6 text-blue-600 font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
