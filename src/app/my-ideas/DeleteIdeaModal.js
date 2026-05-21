'use client';

import { AlertCircle, X } from 'lucide-react';

export default function DeleteIdeaModal({ isOpen, onClose, onConfirm, isDeleting }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10" />
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Wipe from Vault?</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                    This action is permanent. All engagement and validation data for this concept will be lost forever.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 py-4 text-slate-500 font-bold hover:text-slate-900 dark:hover:text-white transition disabled:opacity-50"
                    >
                        Keep It
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black shadow-xl shadow-red-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        {isDeleting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Delete Forever'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
