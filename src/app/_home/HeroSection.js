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
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

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

      if (!response.ok) {
        const text = await response.text();
        console.error("TMDB API error", response.status, text);
        return;
      }

      const data = await response.json();
      setHeroList(data.results);
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

      if (!response.ok) {
        const text = await response.text();
        console.error("TMDB API ERROR:", response.status, text);
        return;
      }

      const detailsData = await response.json();
      setHeroDataDetails(detailsData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // --- FIX 1: Added empty dependency array [] ---
  // This ensures the API is called only once when the component mounts.
  useEffect(() => {
    getData();
  }, []); 

  const handleNext = () => {
    if (heroList.length === 0) return;
    const nextIndex = (currentIndex + 1) % heroList.length;
    setCurrentIndex(nextIndex);
    getHeroDetails(heroList[nextIndex].id);
    setShowTrailer(false);
  };

  const handlePrevious = () => {
    if (heroList.length === 0) return;
    const prevIndex = (currentIndex - 1 + heroList.length) % heroList.length;
    setCurrentIndex(prevIndex);
    getHeroDetails(heroList[prevIndex].id);
    setShowTrailer(false);
  };

  const heroData = heroList[currentIndex];

  return (
    <div className="w-full max-w-[1920px] h-[600px] bg-gray-800 rounded-lg overflow-hidden relative mx-auto">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            {heroData && (
              <>
                {/* --- FIX 2: Added safety check for image path --- */}
                <Image
                  src={heroData.backdrop_path 
                    ? `https://image.tmdb.org/t/p/original${heroData.backdrop_path}` 
                    : "https://via.placeholder.com/1920x1080?text=No+Image"}
                  alt={heroData.title}
                  fill
                  priority
                  className="object-cover opacity-70"
                  sizes="100vw"
                />
                <div className="absolute top-44 left-10 md:left-35 text-white w-[404px] z-20 gap-4 flex flex-col">
                  <p className="font-inter font-normal text-[16px] leading-6">
                    Now Playing:
                  </p>
                  <h1 className="font-inter font-extrabold text-[36px] leading-10">
                    {heroData.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <StarIcon /> {heroData.vote_average?.toFixed(1)}/10
                  </div>
                  <div className="line-clamp-4">{heroDataDetails?.overview}</div>

                  {!showTrailer && (
                    <button
                      className="w-[145px] h-10 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer"
                      onClick={() => setShowTrailer(true)}
                    >
                      ▷ Watch trailer
                    </button>
                  )}
                </div>

                {showTrailer && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <Trailer movieId={heroData.id} />
                    <button
                      className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
                      onClick={() => setShowTrailer(false)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </>
            )}
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-11 transform -translate-y-1/2 bg-white/20 hover:bg-white/50 text-black rounded-full w-10 h-10 flex items-center justify-center z-10 transition"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-11 transform -translate-y-1/2 bg-white/20 hover:bg-white/50 text-black rounded-full w-10 h-10 flex items-center justify-center z-10 transition"
      >
        ›
      </button>
    </div>
  );
}

export default HeroSection;
