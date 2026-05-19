import { Users, Lightbulb, TrendingUp, Globe2 } from 'lucide-react';

const stats = [
    { id: 1, name: 'Active Innovators', value: '50k+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { id: 2, name: 'Live Pitches', value: '12,400', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { id: 3, name: 'Valuation Added', value: '$2.5M+', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 4, name: 'Countries Reached', value: '142', icon: Globe2, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
];

export function ValueStats() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        The World's Engine for Validation
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        IdeaVault isn't just a noticeboard. It's an active, global ecosystem that tests, stretches, and validates your hypotheses long before your first commit.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="flex flex-col items-center p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg transition-all group"
                        >
                            <div className={`p-4 rounded-xl ${stat.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
                                {stat.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
