import { HeroCarousel } from '@/components/home/HeroCarousel';
import { TrendingIdeas } from '@/components/home/TrendingIdeas';
import { ValueStats } from '@/components/home/ValueStats';
import { InnovationRoadmap } from '@/components/home/InnovationRoadmap';
import { authClient } from '@/lib/auth-client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Home() {


  return (
    <>
      <HeroCarousel />
      <TrendingIdeas />
      <ValueStats />
      <InnovationRoadmap />
    </>
  );
}
