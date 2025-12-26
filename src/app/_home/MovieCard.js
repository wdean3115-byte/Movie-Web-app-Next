"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const MovieCard = ({ title, rate, imageUrl, movieId }) => {
  const router = useRouter();

  const handleMovieDetails = () => {
    router.push(`/MovieDetail/${movieId}`);
  };

  return (
    <div
      onClick={handleMovieDetails}
      className="w-[200px] bg-[#F4F4F5] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
    >
      {/* Container for the image to maintain ratio */}
      <div className="relative w-full h-[300px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-sm mt-1">⭐ {rate}/10</p>
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};
