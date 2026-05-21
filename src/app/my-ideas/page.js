'use client';

import { LayoutGrid, Plus } from 'lucide-react';
import Link from 'next/link';
import MyIdeasClient from './MyIdeasClient';

export default function MyIdeasPage() {
    return (
        <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4 text-blue-600">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                                <LayoutGrid className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                                My Vault
                            </h1>
                        </div>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                            Manage your submitted startup concepts and track community feedback in real-time.
                        </p>
                    </div>
                    <Link
                        href="/add-idea"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/25 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        New Concept
                    </Link>
                </div>

                <MyIdeasClient />

            </div>
        </div>
    );
}
