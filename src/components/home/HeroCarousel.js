'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        label: 'Innovate Tomorrow',
        title: 'Transform your abstract ideas into verified startup realities.',
        description: 'Pitch to a dynamic community, receive peer-reviewed feedback, and find your early adopters organically without a line of code.',
        img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80',
        ctaText: 'Browse Ideas',
        ctaLink: '/ideas'
    },
    {
        id: 2,
        label: 'Global Validation',
        title: 'Stop building in the dark. Start validating with real insights.',
        description: 'Leverage our interactive comment framework to pivot fast. Real users tear down your assumptions so you build right the first time.',
        img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80',
        ctaText: 'Submit Concept',
        ctaLink: '/add-idea'
    },
    {
        id: 3,
        label: 'Community Driven',
        title: 'Collaborate with top-tier founders, engineers, and visionaries.',
        description: 'Find your co-founder natively via IdeaVault. Turn individual sparks into massive industry-shaking fires.',
        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
        ctaText: 'Join Now',
        ctaLink: '/register'
    }
];

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-800 min-h-[500px] lg:min-h-[600px] flex items-center">

            {/* Slides container */}
            <div
                className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>

                        {/* Content Content inside container */}
                        <div className="w-full absolute inset-0 flex items-center">
                            <div className="container mx-auto px-4 md:px-6 w-full">
                                <div className="max-w-2xl text-white">
                                    <div
                                        className={`transition-all duration-700 delay-100 ${current === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                            }`}
                                    >
                                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/30 shadow-inner">
                                            {slide.label}
                                        </span>
                                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg text-slate-300 md:text-xl mb-8 leading-relaxed font-light">
                                            {slide.description}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={slide.ctaLink}
                                                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 group"
                                            >
                                                {slide.ctaText}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nav Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4 z-20">
                <button
                    onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-white/10 text-white flex items-center justify-center backdrop-blur-sm transition"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-white/10 text-white flex items-center justify-center backdrop-blur-sm transition"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full ${current === i ? 'w-8 h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
