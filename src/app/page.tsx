import { Hero } from "@/components/home/Hero";
import { QuickOrder } from "@/components/home/QuickOrder";
import { QuickStats } from "@/components/home/QuickStats";
import { TrendingNow } from "@/components/home/TrendingNow";
import { Categories } from "@/components/home/Categories";
import { MenuPreview } from "@/components/home/MenuPreview";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { SpecialBanner } from "@/components/home/SpecialBanner";
import { Gallery } from "@/components/home/Gallery";
import { AboutCafe } from "@/components/home/AboutCafe";
import { Reviews } from "@/components/home/Reviews";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickOrder />
      <QuickStats />
      <TrendingNow />
      <Categories />
      <MenuPreview />
      <RecentlyViewed />
      <WhyChooseUs />
      <SpecialBanner />
      <Gallery />
      <AboutCafe />
      <Reviews />
      <FAQ />
      <CTASection />
    </>
  );
}
