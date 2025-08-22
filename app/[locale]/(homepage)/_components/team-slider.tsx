"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Props {
  members: Member[];
}

export default function TeamSlider({ members }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {members.map((member) => (
            <CarouselItem key={member.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              {/* Carousel card */}
              <Card className="overflow-hidden border-none bg-transparent p-0 shadow-none h-full">
                <CardContent className="lg:p-6 flex flex-col items-center text-center h-full">
                  {/* Avatar */}
                  <div className="relative  overflow-hidden">
                    <Image
                      src={member.image}
                      width={200}
                      height={0}
                      alt={member.name}
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="mt-4 text-base sm:text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.position}</p>

                  {/* Contact */}
                  <div className="flex gap-5 mt-4 text-gray-600">
                    {/* WhatsApp */}
                    <div className="relative flex items-center group">
                      <FaWhatsapp size={20} className="cursor-pointer" />
                      <div
                        className="absolute left-1/2 -top-10 transform -translate-x-1/2 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-300 whitespace-nowrap 
                        bg-gray-800 text-white text-xs rounded py-1 px-2 max-w-[160px] truncate"
                      >
                        <p>{member.whatsapp}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative flex items-center group">
                      <Phone size={20} className="cursor-pointer" />
                      <div
                        className="absolute left-1/2 -top-10 transform -translate-x-1/2 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-300 whitespace-nowrap 
                        bg-gray-800 text-white text-xs rounded py-1 px-2 max-w-[160px] truncate"
                      >
                        <p>{member.phone}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative flex items-center group">
                      <Mail size={20} className="cursor-pointer" />
                      <div
                        className="absolute left-1/2 -top-10 transform -translate-x-1/2 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-300 whitespace-nowrap 
                        bg-gray-800 text-white text-xs rounded py-1 px-2 max-w-[160px] truncate"
                      >
                        <p>{member.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious
          className="
    absolute top-1/2 -translate-y-1/2 
    left-2 sm:left-4 lg:-left-12
    border-none bg-transparent
     flex items-center justify-center
  "
        >
          <IoIosArrowBack className="text-2xl" />
        </CarouselPrevious>

        <CarouselNext
          className="
    absolute top-1/2 -translate-y-1/2 
    right-2 sm:right-4 lg:-right-12
    border-none bg-transparent 
     flex items-center justify-center
  "
        >
          <IoIosArrowForward className="text-2xl" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
