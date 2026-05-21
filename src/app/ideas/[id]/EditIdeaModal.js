'use client';

import { useState } from 'react';
import { X, Check, Lightbulb, Tag, AlignLeft, DollarSign, Users, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function EditIdeaModal({ idea, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        title: idea?.title,
        shortDesc: idea?.shortDesc,
        longDesc: idea?.longDesc,
        category: idea?.category,
        tags: Array.isArray(idea?.tags) ? idea.tags.join(', ') : '',
        imageUrl: idea?.imageUrl,

        estimatedBudget: idea?.estimatedBudget,
        targetAudience: idea?.targetAudience,
        problemStatement: idea?.problemStatement,
        proposedSolution: idea?.proposedSolution
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const categories = ['Tech', 'Health', 'AI', 'Education', 'Fintech', 'SaaS', 'Sustainability'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const updatedData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };
        const success = await onUpdate(updatedData);
        if (success) {
            onClose();
        }
        setIsUpdating(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
            <div
                className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200 my-8"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[90vh]">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Your Vision</h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Core Concept</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputWrapper label="Idea Title" name="title" formData={formData} handleChange={handleChange} icon={Lightbulb} />
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500">
                                            <Tag className="w-5 h-5" />
                                        </div>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition-all text-slate-900 dark:text-white shadow-sm"
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <TextAreaWrapper label="Short Hook" name="shortDesc" formData={formData} handleChange={handleChange} icon={AlignLeft} rows={2} />
                            <TextAreaWrapper label="Detailed Vision" name="longDesc" formData={formData} handleChange={handleChange} icon={AlignLeft} rows={4} />
                        </div>

                        {/* Section 2: Logistics & Market */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Market & Logistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputWrapper label="Tags" name="tags" formData={formData} handleChange={handleChange} icon={Tag} />
                                <InputWrapper label="Image URL" name="imageUrl" formData={formData} handleChange={handleChange} icon={ImageIcon} />
                                <InputWrapper label="Estimated Budget" name="estimatedBudget" formData={formData} handleChange={handleChange} icon={DollarSign} />
                                <InputWrapper label="Target Audience" name="targetAudience" formData={formData} handleChange={handleChange} icon={Users} />
                            </div>
                        </div>

                        {/* Section 3: The Pitch */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">The Pitch Deck</h3>
                            <TextAreaWrapper label="The Problem" name="problemStatement" formData={formData} handleChange={handleChange} icon={AlertCircle} />
                            <TextAreaWrapper label="The Proposed Solution" name="proposedSolution" formData={formData} handleChange={handleChange} icon={Sparkles} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4 bg-white dark:bg-slate-900 sticky bottom-0 z-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-slate-500 font-bold hover:text-slate-900 dark:hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl font-black shadow-xl shadow-blue-500/25 transition-all flex items-center gap-2"
                        >
                            {isUpdating ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Check className="w-5 h-5" />
                            )}
                            <span>{isUpdating ? 'Saving...' : 'Update Blueprint'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Helpers
const InputWrapper = ({ label, name, formData, handleChange, icon: Icon, type = 'text' }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white shadow-sm"
            />
        </div>
    </div>
);

const TextAreaWrapper = ({ label, name, formData, handleChange, icon: Icon, rows = 3 }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                rows={rows}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white shadow-sm resize-none"
            />
        </div>
    </div>
);
