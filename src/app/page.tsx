import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { BestSellers } from "@/components/home/BestSellers";
import { SpecialBanner } from "@/components/home/SpecialBanner";
import { AboutCafe } from "@/components/home/AboutCafe";
import { CTASection } from "@/components/home/CTASection";
import { Reviews } from "@/components/home/Reviews";
import { Gallery } from "@/components/home/Gallery";
import { StoreLocator } from "@/components/home/StoreLocator";
import { FAQ } from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <SpecialBanner />
      <AboutCafe />
      <CTASection />
      <Reviews />
      <Gallery />
      <StoreLocator />
      <FAQ />
    </>
  );
}
