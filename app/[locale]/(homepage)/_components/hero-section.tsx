import { fetchHeroBG, fetchHeroAssets } from "@/lib/api/strapi";
import HeroSlider from "./hero-slider";

export default async function HeroSection() {
  // Requests
  const { data: bgSection } = await fetchHeroBG();
  const { data: heroAssets } = await fetchHeroAssets();

  return (
    <div className="relative w-full mt-16 h-[850px] overflow-hidden bg-custom-gradient__hero">
      {/* Background image */}
      {bgSection[0]?.type === "image" && bgSection[0]?.media && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%), url(${bgSection[0].media})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Background video */}
      {bgSection[0]?.type === "video" && bgSection[0]?.media && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src={bgSection[0].media} type={`video/${bgSection[0].media}`} />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Hero slider */}
      <HeroSlider heroAssets={heroAssets} />
    </div>
  );
}
