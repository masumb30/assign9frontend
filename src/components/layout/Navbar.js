'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Lightbulb, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useIdeas } from '@/context/IdeaContext';
import { authClient } from '@/lib/auth-client';

export function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsOpen(false);
        window.location.reload();
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Ideas', href: '/ideas' },
        { name: 'Add Idea', href: '/add-idea' },
        { name: 'My Ideas', href: '/my-ideas' },
        { name: 'Interactions', href: '/my-interactions' },
    ];

    const MobileMenu = () => (
        <div className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-slate-900 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full pt-20 px-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`py-4 text-xl font-medium border-b border-slate-100 dark:border-slate-800 ${pathname === link.href ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}
                    >
                        {link.name}
                    </Link>
                ))}
                {!user ? (
                    <div className="mt-8 flex flex-col gap-4">
                        <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-3 text-center rounded-lg border border-slate-200 dark:border-slate-700 font-medium">Log In</Link>
                        <Link href="/register" onClick={() => setIsOpen(false)} className="w-full py-3 text-center rounded-lg bg-blue-600 text-white font-medium">Sign Up</Link>
                    </div>
                ) : (
                    <div className="mt-8 py-4 px-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={async () => {
                                await authClient.signOut();
                                setIsOpen(false);
                                window.location.reload();
                            }}
                            className="w-full py-2 text-red-500 font-medium text-left border-t border-slate-200 dark:border-slate-700 mt-2 pt-4"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Idea<span className="text-blue-600 dark:text-blue-400">Vault</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href
                                ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* Desktop Auth */}
                    <div className="hidden md:block relative">
                        {isPending ? (
                            <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin"></div>
                        ) : !user ? (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition">Log In</Link>
                                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm hover:shadow-md">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition"
                                >
                                    <span className="text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                </button>
                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                                            <p className="text-sm font-medium truncate text-slate-900 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <Link href="/my-ideas" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">My Profile</Link>
                                        <button
                                            onClick={async () => {
                                                await authClient.signOut();
                                                setIsProfileOpen(false);
                                                window.location.reload();
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-600 dark:text-slate-300 z-50"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

            </div>
            <MobileMenu />
        </header>
    );
}
