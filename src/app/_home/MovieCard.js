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
      className="w-[200px] bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={title}
        width={500} // Standard TMDB width
        height={282} // To maintain your h-[282px] aspect ratio
        className="w-full h-[282px] object-cover cursor-pointer"
      />
      <div className="p-3 bg-[#F4F4F5]">
        <p className="text-yellow-600 text-sm mt-1">⭐ {rate}/10</p>
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};
