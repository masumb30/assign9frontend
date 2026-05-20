'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Image as ImageIcon, Lock, UserPlus, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { signupAction } from '@/actions';

export default function RegisterPage() {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        username: 'Masum Billah',
        email: 'masum@vault.com',
        photoUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
        password: 'Password123'
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        if (name === 'password') {
            const errs = [];
            if (value.length < 6) errs.push('Min 6 characters');
            if (!/[A-Z]/.test(value)) errs.push('One uppercase letter');
            if (!/[a-z]/.test(value)) errs.push('One lowercase letter');
            return errs;
        }
        return [];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            const passErrors = validate('password', value);
            setErrors(prev => ({ ...prev, password: passErrors }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const passErrors = validate('password', formData.password);

        if (passErrors.length > 0) {
            addToast({
                type: 'error',
                title: 'Validation Failed',
                message: 'Please check your password requirements.'
            });
            return;
        }
        console.log("sign up data: ", JSON.stringify(formData))
        const result = await signupAction(null, formData);

        addToast({
            type: 'success',
            title: 'Success!',
            message: 'Account created. Welcome to IdeaVault.'
        });
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
            <div className="w-full max-w-lg">

                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none p-8 md:p-12">

                    <div className="text-center mb-10">
                        <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
                            <UserPlus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Join the Network</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Start validating your innovations today</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">User Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="John Innovator"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@vault.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Avatar URL</label>
                            <div className="relative group">
                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                />
                            </div>

                            {/* Validation Checkmarks */}
                            <div className="pt-3 px-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {[
                                    { label: '6+ Characters', valid: formData.password.length >= 6 },
                                    { label: 'Uppercase', valid: /[A-Z]/.test(formData.password) },
                                    { label: 'Lowercase', valid: /[a-z]/.test(formData.password) },
                                ].map((req, i) => (
                                    <div key={i} className={`flex items-center gap-2 text-xs font-bold ${req.valid ? 'text-emerald-500' : 'text-slate-400'}`}>
                                        {req.valid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                        <span>{req.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group mt-4"
                        >
                            Verify & Create
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                </div>

                <p className="text-center mt-8 text-slate-500 font-medium">
                    Already a member? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
                </p>

            </div>
        </div>
    );
}
