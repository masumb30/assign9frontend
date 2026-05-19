import Link from 'next/link';
import { Lightbulb, Twitter, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Col 1: Brand & Desc */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group inline-flex">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Lightbulb className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Idea<span className="text-blue-600 dark:text-blue-400">Vault</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                            The premier platform for innovators to pitch, discuss, and validate modern startup concepts with a community of forward-thinkers.
                        </p>
                    </div>

                    {/* Col 2: Platform Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">How it works</Link></li>
                            <li><Link href="/ideas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Browse Ideas</Link></li>
                            <li><Link href="/add-idea" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Submit Concept</Link></li>
                            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Pricing & Plans</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Categories */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Top Categories</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/ideas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Artificial Intelligence</Link></li>
                            <li><Link href="/ideas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">HealthTech</Link></li>
                            <li><Link href="/ideas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">EdTech Solutions</Link></li>
                            <li><Link href="/ideas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Fintech & DeFi</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Connect */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Connect</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>hello@ideavault.com</span>
                            </li>
                            <li>123 Innovation Drive, Tech City</li>
                        </ul>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition" aria-label="X (Twitter)">
                                {/* Modern X logo SVG */}
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition" aria-label="Github">
                                {/* <Github className="w-5 h-5" /> */}
                            </a>
                            <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition" aria-label="LinkedIn">
                                {/* <Linkedin className="w-5 h-5" /> */}
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} IdeaVault Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
