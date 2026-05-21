'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, onClick, mobile = false }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    if (mobile) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={`py-4 px-4 text-xl font-bold rounded-2xl transition-all ${isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
            >
                {children}
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
        >
            {children}
        </Link>
    );
}
