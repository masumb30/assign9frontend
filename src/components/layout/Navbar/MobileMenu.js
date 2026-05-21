'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, LogOut, User as UserIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import NavLink from './NavLink';

export default function MobileMenu({ isOpen, setIsOpen, navLinks, user }) {
    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsOpen(false);
        window.location.reload();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 z-50 h-[100dvh] w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full invisible'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xl font-black text-slate-900 dark:text-white">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Links */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                href={link.href}
                                mobile
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer / Auth */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                        {!user ? (
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-black text-slate-700 dark:text-slate-200"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-center rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-500/25"
                                >
                                    Get Started
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                                    ) : (
                                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                                            <UserIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-sm text-slate-500 truncate font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full py-4 flex items-center justify-center gap-3 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-2xl font-black transition-all active:scale-95"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
