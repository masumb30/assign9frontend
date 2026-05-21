import { HeroCarousel } from '@/components/home/HeroCarousel';
import { TrendingIdeas } from '@/components/home/TrendingIdeas';
import { ValueStats } from '@/components/home/ValueStats';
import { InnovationRoadmap } from '@/components/home/InnovationRoadmap';
import { authClient } from '@/lib/auth-client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Home() {
  const token = await auth.api.getToken({
    headers: await headers()
  })
  console.log('server side token: ', token)

  return (
    <>
      <HeroCarousel />
      <TrendingIdeas />
      <ValueStats />
      <InnovationRoadmap />
    </>
  );
}
