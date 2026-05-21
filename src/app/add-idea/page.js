'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIdeas } from '@/context/IdeaContext';
import {
    Lightbulb,
    Image as ImageIcon,
    Tag,
    DollarSign,
    Users,
    AlignLeft,
    AlertCircle,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast, ToastContainer } from 'react-toastify';
import TestIdeaGenerator from './TestIdeaGenerator';

const InputWrapper = ({ label, name, formData, handleChange, icon: Icon, placeholder, type = 'text', required = true }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            {label}
        </label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white shadow-sm"
            />
        </div>
    </div>
);

const TextAreaWrapper = ({ label, name, formData, handleChange, icon: Icon, placeholder, required = true, rows = 4 }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            {label}
        </label>
        <div className="relative group">
            <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white shadow-sm resize-none"
            />
        </div>
    </div>
);

export default function AddIdeaPage() {
    const router = useRouter();
    const { addIdea } = useIdeas();

    const [formData, setFormData] = useState({
        title: '',
        shortDesc: '',
        longDesc: '',
        category: 'Tech',
        tags: '',
        imageUrl: '',
        estimatedBudget: '',
        targetAudience: '',
        problemStatement: '',
        proposedSolution: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['Tech', 'Health', 'AI', 'Education', 'Fintech', 'SaaS', 'Sustainability'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Process tags into array
        const ideaData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };

        const { data, error } = await authClient.token()
        if (error) {
            // handle error
        }
        if (data) {
            const jwtToken = data.token
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify(ideaData)
                });
                const data = await response.json();
                console.log("idea posted result: ", data);
                if (data.ideaId) {
                    toast.success("Idea posted successfully");
                    setFormData({
                        title: '',
                        shortDesc: '',
                        longDesc: '',
                        category: 'Tech',
                        tags: '',
                        imageUrl: '',
                        estimatedBudget: '',
                        targetAudience: '',
                        problemStatement: '',
                        proposedSolution: ''
                    });
                }
                // if data is success then show a toast and clear form fields. 
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }

    };



    return (
        <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <ToastContainer autoClose={1500} />
            <div className="container mx-auto px-4 max-w-4xl">

                <div className="text-center mb-12">
                    <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                        <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        Pitch Your Vision
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Fill out the blueprint for your next big thing. Be detailed, clear, and ready for the community to validate your concept.
                    </p>
                </div>

                <TestIdeaGenerator onGenerate={(data) => setFormData(data)} />

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">Core Concept</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputWrapper
                                label="Idea Title"
                                name="title"
                                formData={formData}
                                handleChange={handleChange}
                                icon={Lightbulb}
                                placeholder="e.g. EcoTrack: Carbon API"
                            />
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

                        <TextAreaWrapper
                            label="Short Hook"
                            name="shortDesc"
                            formData={formData}
                            handleChange={handleChange}
                            icon={AlignLeft}
                            placeholder="Give us a 1-sentence punchy elevator pitch..."
                            rows={2}
                        />

                        <TextAreaWrapper
                            label="Detailed Vision"
                            name="longDesc"
                            formData={formData}
                            handleChange={handleChange}
                            icon={AlignLeft}
                            placeholder="Explain the full scope of your concept, how it works, and the impact it will have..."
                            rows={6}
                        />
                    </div>

                    {/* Section 2: Logistics & Market */}
                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">Market & Logistics</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputWrapper
                                label="Tags"
                                name="tags"
                                formData={formData}
                                handleChange={handleChange}
                                icon={Tag}
                                placeholder="AI, Sustainability, DevTools (comma separated)"
                            />
                            <InputWrapper
                                label="Image URL"
                                name="imageUrl"
                                formData={formData}
                                handleChange={handleChange}
                                icon={ImageIcon}
                                placeholder="https://images.unsplash.com/photo..."
                            />
                            <InputWrapper
                                label="Estimated Budget"
                                name="estimatedBudget"
                                formData={formData}
                                handleChange={handleChange}
                                icon={DollarSign}
                                placeholder="e.g. $50k - $100k"
                            />
                            <InputWrapper
                                label="Target Audience"
                                name="targetAudience"
                                formData={formData}
                                handleChange={handleChange}
                                icon={Users}
                                placeholder="e.g. Early-stage founders, E-commerce owners"
                            />
                        </div>
                    </div>

                    {/* Section 3: The Pitch */}
                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
                        <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">The Pitch Deck</h2>

                        <TextAreaWrapper
                            label="The Problem"
                            name="problemStatement"
                            formData={formData}
                            handleChange={handleChange}
                            icon={AlertCircle}
                            placeholder="What exact friction point or gap in the market are you addressing?"
                        />

                        <TextAreaWrapper
                            label="The Proposed Solution"
                            name="proposedSolution"
                            formData={formData}
                            handleChange={handleChange}
                            icon={Sparkles}
                            placeholder="How does your concept uniquely solve the problem above?"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto px-10 py-4 text-slate-500 font-bold hover:text-slate-900 dark:hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-pointer text-white rounded-2xl font-black shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            )}
                            <span>{isSubmitting ? 'Deploying...' : 'Deploy to Vault'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
