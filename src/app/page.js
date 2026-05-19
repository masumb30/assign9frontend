import { HeroCarousel } from '@/components/home/HeroCarousel';
import { TrendingIdeas } from '@/components/home/TrendingIdeas';
import { ValueStats } from '@/components/home/ValueStats';
import { InnovationRoadmap } from '@/components/home/InnovationRoadmap';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrendingIdeas />
      <ValueStats />
      <InnovationRoadmap />
    </>
  );
}
