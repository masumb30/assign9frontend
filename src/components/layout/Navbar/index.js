'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Sun, Moon, Lightbulb } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { authClient } from '@/lib/auth-client';
import NavLink from './NavLink';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Vault', href: '/ideas' },
        { name: 'Pitch', href: '/add-idea' },
        { name: 'My Vault', href: '/my-ideas' },
        { name: 'Interactions', href: '/my-interactions' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group relative">
                    <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/20">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Idea<span className="text-blue-600 dark:text-blue-400">Vault</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl gap-1 border border-slate-200/50 dark:border-slate-700/50">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} href={link.href}>
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-all active:scale-90"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* Desktop Auth */}
                    <div className="hidden md:block">
                        {isPending ? (
                            <div className="w-8 h-8 rounded-xl border-2 border-slate-200 border-t-blue-600 animate-spin"></div>
                        ) : !user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95"
                                >
                                    Join Vault
                                </Link>
                            </div>
                        ) : (
                            <UserDropdown user={user} />
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="lg:hidden p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

            </div>

            {/* Mobile Drawer */}
            <MobileMenu
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                navLinks={navLinks}
                user={user}
            />
        </header>
    );
}
