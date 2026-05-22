import { HeroCarousel } from '@/components/home/HeroCarousel';
import { TrendingIdeas } from '@/components/home/TrendingIdeas';
import { ValueStats } from '@/components/home/ValueStats';
import { InnovationRoadmap } from '@/components/home/InnovationRoadmap';
import { authClient } from '@/lib/auth-client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Home() {

  console.log('TESTENV: GOES HERE:::::', process.env.TESTENV);
  console.log('NEXT_PUBLIC_TEST_ENV: GOES HERE::::', process.env.NEXT_PUBLIC_TEST_ENV);
  return (
    <>
      <HeroCarousel />
      <TrendingIdeas />
      <ValueStats />
      <InnovationRoadmap />
    </>
  );
}
