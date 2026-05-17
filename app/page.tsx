import { BrandHeader } from '@/components/BrandHeader';
import { Hero } from '@/components/sections/Hero';
import { Tools } from '@/components/sections/Tools';
import { Compare } from '@/components/sections/Compare';
import { Subconscious } from '@/components/sections/Subconscious';
import { Architecture } from '@/components/sections/Architecture';
import { Stats } from '@/components/sections/Stats';
import { CodeGraph } from '@/components/sections/CodeGraph';
import { Maintenance } from '@/components/sections/Maintenance';
import { Install } from '@/components/sections/Install';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <BrandHeader />
      <Hero />
      <div className="section-divider" />
      <Tools />
      <div className="section-divider" />
      <Compare />
      <div className="section-divider" />
      <Subconscious />
      <div className="section-divider" />
      <Architecture />
      <div className="section-divider" />
      <CodeGraph />
      <div className="section-divider" />
      <Stats />
      <div className="section-divider" />
      <Maintenance />
      <div className="section-divider" />
      <Install />
      <Footer />
    </main>
  );
}
