import { Rocket, Sparkles, Target, Zap } from 'lucide-react';

const steps = [
    {
        icon: Sparkles,
        title: 'Phase 1: The Spark',
        desc: 'You document the core problem. No business model yet, just a clear breakdown of a friction point you want to solve.',
        color: 'blue'
    },
    {
        icon: Target,
        title: 'Phase 2: Crowd-Validation',
        desc: 'The community of builders and experts weigh in. They poke holes, suggest alternatives, and validate market demand.',
        color: 'amber'
    },
    {
        icon: Zap,
        title: 'Phase 3: Deep Iteration',
        desc: 'You refine your pitch based on hundreds of data points, establishing a solid foundation before risking capital.',
        color: 'purple'
    },
    {
        icon: Rocket,
        title: 'Phase 4: Launch & Scale',
        desc: 'When the confidence score hits critical mass, you leverage the network to find co-founders and early beta testers instantly.',
        color: 'emerald'
    }
];

export function InnovationRoadmap() {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 text-white relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="max-w-2xl mx-auto mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-white">
                        Your Roadmap to Launch
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Stop guessing what the market wants. Follow a structured pipeline from abstract thought to verified demand.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">

                    {/* Connecting vertical line (desktop) */}
                    <div className="hidden md:block absolute left-1/2 -ml-0.5 top-8 bottom-8 w-1 bg-slate-800 rounded-full"></div>

                    <div className="space-y-12">
                        {steps.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}>

                                    {/* Content Box */}
                                    <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} bg-slate-800/50 md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border border-slate-700/50 md:border-none`}>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-slate-400 leading-relaxed text-lg">{step.desc}</p>
                                    </div>

                                    {/* Node Icon */}
                                    <div className="absolute top-6 left-6 md:static flex-shrink-0 w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-800 shadow-xl flex items-center justify-center z-10 transition-transform hover:scale-110">
                                        <step.icon className={`w-7 h-7 text-${step.color}-400`} />
                                    </div>

                                    {/* Empty space for balance (desktop) */}
                                    <div className="hidden md:block w-1/2"></div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
