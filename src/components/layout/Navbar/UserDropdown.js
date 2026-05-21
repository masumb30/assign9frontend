'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function UserDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsOpen(false);
        window.location.reload();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 pl-4 pr-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group"
            >
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                    {user.name}
                </span>
                {user.image ? (
                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all" />
                ) : (
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        <User className="w-4 h-4" />
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate font-medium">{user.email}</p>
                    </div>

                    <DropdownItem href="/my-ideas" icon={LayoutDashboard} label="My Vault" onClick={() => setIsOpen(false)} />
                    <DropdownItem href="/my-interactions" icon={Settings} label="Interactions" onClick={() => setIsOpen(false)} />

                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-2 text-red-500">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold group"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const DropdownItem = ({ href, icon: Icon, label, onClick }) => (
    <div className="px-2">
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
        >
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-bold">{label}</span>
        </Link>
    </div>
);
