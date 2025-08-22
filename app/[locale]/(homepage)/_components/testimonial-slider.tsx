import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchTeam } from "@/lib/api/strapi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Member = {
  id: number;
  name: string;
  position: string;
  email: string;
  image: string;
  phone: string;
  whatsapp: string;
  description: string;
};

export default async function TestimonialSlider() {
  const { data: members } = await fetchTeam();
  const t = await getTranslations();

  return (
    <div className="w-full mx-auto py-16 px-8 md:px-16 lg:px-32 bg-main-color text-white relative">
      <div className="container mx-auto">
        {/* Header */}
        <div className="pb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("testimonial-title")}
          </h2>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed">{t("testimonial-desc")}</p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {members.map((member: Member) => (
              <CarouselItem key={member.id}>
                <div className="flex flex-col h-full lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
                  {/* Image */}
                  <div className="w-full lg:w-1/4 flex justify-center lg:justify-start">
                    <div className="relative w-80 h-96 overflow-hidden rounded-lg">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full h-full flex flex-col justify-between text-center lg:text-left">
                    <p className="text-xl leading-relaxed mb-12 ">
                      &quot;{member.description}&quot;
                    </p>

                    <div className="space-y-2 xl:mt-24 rtl:text-start">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white">
                        {member.name}
                      </h3>
                      <p className="text-lg md:text-x mt-5">{member.position}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="absolute bottom-6 flex gap-3 ltr:right-6 rtl:left-6">
            <CarouselPrevious className="static w-12 h-12 rounded-full bg-white/90 text-amber-900 hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg rtl:[&>svg]:rotate-180">
              <ArrowLeft />
            </CarouselPrevious>

            <CarouselNext className="static w-12 h-12 rounded-full bg-white/90 text-amber-900 hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg rtl:[&>svg]:rotate-180">
              <ArrowRight />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
