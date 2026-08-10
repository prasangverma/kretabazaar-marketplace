import HeroSection from '@/components/home/HeroSection';
import ProjectGrid from '@/components/home/ProjectGrid';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 pb-16">
      <HeroSection />
      <ProjectGrid />
    </div>
  );
}
