import Image from "next/image";
import { useTranslations } from "next-intl";
import { fetchServices, fetchTeam } from "@/lib/api/strapi";
import HeroSection from "./_components/hero-section";
import OurTeam from "./_components/our-team";
import TestimonialSlider from "./_components/testimonial-slider";

export default async function Home() {
  // const t = useTranslations("Index");
  const data = await fetchServices();
  // console.log("members data:", data);
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Team */}
      <OurTeam />

      {/* Testimonial */}
      <TestimonialSlider />
    </>
  );
}
