'use client';

import { Sparkles } from 'lucide-react';
import { INITIAL_IDEAS } from '@/ideas';

export default function TestIdeaGenerator({ onGenerate }) {
    const handleGenerate = () => {
        const randomIndex = Math.floor(Math.random() * INITIAL_IDEAS.length);
        const randomIdea = INITIAL_IDEAS[randomIndex];

        // Map data to form fields
        const testData = {
            title: randomIdea.title,
            shortDesc: randomIdea.shortDesc,
            longDesc: randomIdea.longDesc,
            category: randomIdea.category,
            tags: Array.isArray(randomIdea.tags) ? randomIdea.tags.join(', ') : '',
            imageUrl: randomIdea.imageUrl,
            estimatedBudget: randomIdea.estimatedBudget,
            targetAudience: randomIdea.targetAudience,
            problemStatement: randomIdea.problemStatement,
            proposedSolution: randomIdea.proposedSolution
        };

        onGenerate(testData);
    };

    return (
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-lg shadow-blue-500/10">
            <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-2xl text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                    <h3 className="font-black text-slate-900 dark:text-white leading-tight">Testing Suite</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Auto-fill with complex mock concepts.</p>
                </div>
            </div>
            <button
                type="button"
                onClick={handleGenerate}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
                Generate Data
            </button>
        </div>
    );
}
