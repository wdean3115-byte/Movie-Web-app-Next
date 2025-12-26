"use client";
import { MovieCard } from "./MovieCard";
import SeeMoreIcon from "../_icons/SeeMoreIcon";
import { useEffect, useState } from "react";

const ACCESS_TOKEN = "YOUR_TOKEN_HERE"; 
const BASE_URL = "https://api.themoviedb.org/3/";

function PopularList() {
  const [movieData, setMovieData] = useState([]);

  const getData = async () => {
    try {
      const popularMovieEndPoint = `${BASE_URL}/movie/popular?language=en-US&page=1`;
      const response = await fetch(popularMovieEndPoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      // Only take the first 10 movies for a cleaner layout if needed
      setMovieData(data.results.slice(0, 10)); 
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    // FIX: Use w-full and mx-auto for better centering and responsiveness
    <div className="w-full max-w-[1440px] mx-auto py-10">
      <div className="flex justify-between items-center px-4 md:px-20 mb-8">
        <h2 className="text-[24px] font-semibold text-[#09090B]">Popular</h2>
        <button className="flex items-center justify-center gap-2 hover:opacity-70 transition">
          <p className="text-sm font-medium text-[#09090B]">See more</p>
          <SeeMoreIcon />
        </button>
      </div>

      {/* FIX: Use responsive grid columns (1 on mobile, 3 on tablet, 5 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 md:px-20 gap-8">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            // FIX: Added optional chaining in case vote_average is missing
            rate={movie.vote_average?.toFixed(1) || "N/A"}
            imageUrl={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : "/no-poster.png"}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularList;
