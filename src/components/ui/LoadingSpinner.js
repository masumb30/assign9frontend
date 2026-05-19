export function LoadingSpinner({ text = 'Loading...' }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
            <div className="relative w-12 h-12">
                <div className="absolute w-full h-full border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute w-full h-full border-4 border-blue-600 dark:border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            {text && (
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}
