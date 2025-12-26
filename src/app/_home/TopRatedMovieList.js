"use client";
import { MovieCard } from "./MovieCard";
import SeeMoreIcon from "../_icons/SeeMoreIcon";
import { useEffect, useState } from "react";

const ACCESS_TOKEN = "YOUR_TOKEN_HERE";
const BASE_URL = "https://api.themoviedb.org/3/";

function TopRatedList() {
  const [movieData, setMovieData] = useState([]);

  const getData = async () => {
    try {
      const topRatedEndPoint = `${BASE_URL}/movie/top_rated?language=en-US&page=1`;
      const response = await fetch(topRatedEndPoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      // Optionally slice to 10 if you only want two rows of 5
      setMovieData(data.results.slice(0, 10)); 
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    // Changed fixed width to max-width + mx-auto for responsiveness
    <div className="w-full max-w-[1440px] mx-auto py-10">
      <div className="flex justify-between items-center px-10 md:px-20 mb-6">
        <h2 className="text-[24px] font-semibold text-[#09090B]">Top Rated</h2>
        <button className="flex items-center justify-center gap-2 hover:opacity-60 transition">
          <p className="text-sm font-medium text-[#09090B]">See more</p>
          <SeeMoreIcon />
        </button>
      </div>

      {/* Responsive Grid: 2 columns on mobile, 5 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-10 md:px-20 gap-8">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            // Added optional chaining (?) to prevent crashes
            rate={movie.vote_average?.toFixed(1) || "0.0"}
            // Changed 'original' to 'w500' for much faster loading
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TopRatedList;
