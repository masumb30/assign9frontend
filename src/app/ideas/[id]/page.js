
import IdeaDetailsContent from './IdeaDetailsContent';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function IdeaDetailsPage({ params }) {
    const { id } = await params;

    // Fetch session on the server
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Fetch idea by id
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`, {
        cache: 'no-store' // Ensure we get fresh data
    });

    if (!response.ok) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Idea not found</h2>
                <Link href="/ideas" className="text-blue-600 hover:underline">
                    Return to directory
                </Link>
            </div>
        );
    }

    const idea = await response.json();

    return <IdeaDetailsContent initialIdea={idea} session={session} />;
}

