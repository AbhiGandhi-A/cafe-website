import { Hero } from "@/components/home/Hero";
import { QuickStats } from "@/components/home/QuickStats";
import { Categories } from "@/components/home/Categories";
import { BestSellers } from "@/components/home/BestSellers";
import { MenuPreview } from "@/components/home/MenuPreview";
import { AboutCafe } from "@/components/home/AboutCafe";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickStats />
      <Categories />
      <BestSellers />
      <MenuPreview />
      <AboutCafe />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
