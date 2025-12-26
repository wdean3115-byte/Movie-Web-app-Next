"use client";
import { useState, useEffect } from "react";
import StarIcon from "../_icons/StarIcon";
import Trailer from "./Trailer";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "YOUR_TOKEN_HERE";

function HeroSection() {
  const [heroList, setHeroList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroDataDetails, setHeroDataDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getData = async () => {
    try {
      const trendingEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
      const response = await fetch(trendingEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setHeroList(data.results);
      // Initialize details for the first movie
      if (data.results[0]) {
        getHeroDetails(data.results[0].id);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getHeroDetails = async (movieId) => {
    try {
      const detailsEndpoint = `${BASE_URL}/movie/${movieId}?language=en-US`;
      const response = await fetch(detailsEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) return;

      const detailsData = await response.json();
      setHeroDataDetails(detailsData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); 

  // --- FIX: Sync details whenever the index changes ---
  useEffect(() => {
    if (heroList.length > 0) {
      getHeroDetails(heroList[currentIndex].id);
    }
  }, [currentIndex, heroList]);

  const handleNext = () => {
    if (heroList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % heroList.length);
    setShowTrailer(false);
  };

  const handlePrevious = () => {
    if (heroList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + heroList.length) % heroList.length);
    setShowTrailer(false);
  };

  const heroData = heroList[currentIndex];

  return (
    <div className="w-full max-w-[1920px] h-[600px] bg-gray-900 rounded-lg overflow-hidden relative mx-auto">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            {heroData && (
              <div className="relative w-full h-[600px]">
                <Image
                  src={heroData.backdrop_path 
                    ? `https://image.tmdb.org/t/p/original${heroData.backdrop_path}` 
                    : "https://via.placeholder.com/1920x1080?text=No+Image"}
                  alt={heroData.title}
                  fill
                  priority
                  className="object-cover opacity-60"
                  sizes="100vw"
                />
                
                {/* Content Overlay */}
                <div className="absolute top-40 left-10 md:left-24 text-white w-full max-w-[500px] z-20 flex flex-col gap-4">
                  <p className="text-sm font-medium uppercase tracking-widest text-gray-300">
                    Now Playing
                  </p>
                  <h1 className="font-inter font-extrabold text-[40px] md:text-[56px] leading-tight">
                    {heroData.title}
                  </h1>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <StarIcon /> {heroData.vote_average?.toFixed(1)}/10
                  </div>
                  <p className="line-clamp-3 text-gray-200 text-lg leading-relaxed bg-black/20 p-2 rounded">
                    {heroDataDetails?.overview || heroData.overview}
                  </p>

                  {!showTrailer && (
                    <button
                      className="w-[180px] h-12 rounded-full bg-white text-black font-bold hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg"
                      onClick={() => setShowTrailer(true)}
                    >
                      ▷ Watch trailer
                    </button>
                  )}
                </div>

                {showTrailer && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
                    <div className="relative w-full max-w-[1000px] aspect-video">
                       <Trailer movieId={heroData.id} />
                       <button
                         className="absolute -top-12 right-0 text-white text-4xl hover:text-red-500 transition cursor-pointer"
                         onClick={() => setShowTrailer(false)}
                       >
                         ✕
                       </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Navigation Buttons */}
      <button onClick={handlePrevious} className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center z-30 backdrop-blur-sm transition">‹</button>
      <button onClick={handleNext} className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center z-30 backdrop-blur-sm transition">›</button>
    </div>
  );
}

export default HeroSection;
