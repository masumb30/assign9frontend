import Link from 'next/link';
import { ArrowRight, DollarSign, Users, Tag } from 'lucide-react';

export function IdeaCard({ idea, showActions = false, children }) {
    if (!idea) return null;

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition group overflow-hidden">

            {/* Abstract Image Placeholder for Design */}
            <div
                className="h-40 w-full bg-slate-100 dark:bg-slate-800 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${idea.imageUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 flex gap-2">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md shadow-sm">
                        {idea.category}
                    </span>
                </div>
            </div>

            <div className="flex-1 p-5 md:p-6 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {idea.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 flex-1 line-clamp-3 leading-relaxed">
                    {idea.shortDesc}
                </p>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-500 dark:text-slate-500 mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                        <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{idea.estimatedBudget}</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                        <Users className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{idea.targetAudience}</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden col-span-2">
                        <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{idea.tags.join(', ')}</span>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-auto">
                    {!showActions ? (
                        <Link
                            href={`/ideas/${idea.id}`}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition"
                        >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    ) : (
                        <div className="w-full">
                            {children}
                        </div>
                    )}
                    <div className="text-xs font-medium text-slate-400">
                        {new Date(idea.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
