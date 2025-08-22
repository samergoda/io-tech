"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

type HeroAsset = {
  id: number;
  type: "image" | "video";
  media: string;
  title: string;
  info: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

interface HeroSliderProps {
  heroAssets: HeroAsset[];
}

export default function HeroSlider({ heroAssets }: HeroSliderProps) {
  const t = useTranslations();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (heroAssets[current]?.type === "image" || !heroAssets[current]?.type) {
        setCurrent((prev) => (prev + 1) % heroAssets.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [current, heroAssets]);

  if (!heroAssets || heroAssets.length === 0) {
    return null;
  }

  const currentAsset = heroAssets[current];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAsset.id}
          className="flex flex-col md:flex-row xl:justify-center items-center gap-8 md:gap-20 h-full px-4 md:px-12 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left content */}
          <div className="xl:flex-1 max-w-2xl text-white text-center ltr:text-left rtl:text-right">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 dark:text-black">
              {currentAsset.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mb-6 leading-relaxed dark:text-black">
              {currentAsset.info || currentAsset.description}
            </p>
            <button className="bg-white text-main-color px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-medium hover:bg-white/90 transition-colors">
              {t("read-more")}
            </button>
          </div>

          {/* Right image/video */}
          <div className="flex-shrink-0">
            {currentAsset.type === "image" || !currentAsset.type ? (
              <Image
                src={currentAsset?.media}
                alt={currentAsset.title}
                width={400}
                height={500}
                className="w-64 sm:w-72 md:w-80 lg:w-[400px] h-72 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg"
              />
            ) : (
              <video
                src={currentAsset.media}
                autoPlay
                muted
                playsInline
                loop
                className="w-64 sm:w-72 md:w-80 lg:w-[400px] h-72 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg"
                onEnded={() => setCurrent((prev) => (prev + 1) % heroAssets.length)}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bullets + arrow */}
      <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 sm:gap-3">
        <button
          aria-label="Go to next slide"
          onClick={() => setCurrent((prev) => (prev - 1 + heroAssets.length) % heroAssets.length)}
          className="p-1 bg-transparent rounded-full mb-20 dark:text-black"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />
        </button>
        {heroAssets.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all",
              i === current
                ? "bg-white dark:bg-black"
                : "bg-transparent border-2 border-white dark:text-black dark:border-black"
            )}
          />
        ))}
      </div>
    </div>
  );
}
