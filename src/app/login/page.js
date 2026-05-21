import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-slate-500 font-medium animate-pulse">Loading login terminal...</div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}