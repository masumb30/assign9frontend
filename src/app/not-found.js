import Link from 'next/link';
import { Home, Lightbulb, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Animated Icon Container */}
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-full h-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center shadow-2xl">
                        <AlertTriangle className="w-12 h-12 text-blue-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-rose-500 rounded-full p-2 text-white shadow-lg rotate-12">
                        <span className="font-bold text-sm">404</span>
                    </div>
                </div>

                <div className="space-y-3 mt-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Idea Not Found
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">
                        We searched the vault, but it seems this concept hasn't been pitched yet, or the page was moved.
                    </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        href="/ideas"
                        className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                        <Lightbulb className="w-5 h-5" />
                        Browse Ideas
                    </Link>
                </div>

            </div>
        </div>
    );
}
