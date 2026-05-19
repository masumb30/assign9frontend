'use client';

import { useToast } from '@/context/ToastContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="toast-enter flex items-start gap-3 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                    <div className="flex-shrink-0 mt-0.5">
                        {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500" />}
                        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                        {toast.title && (
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                {toast.title}
                            </h4>
                        )}
                        {toast.message && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {toast.message}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
