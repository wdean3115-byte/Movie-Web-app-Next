"use client";
import { MovieCard } from "./MovieCard";
import SeeMoreIcon from "../_icons/SeeMoreIcon";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../_icons/LoadingSkeleton";
import { useRouter } from "next/navigation";

const ACCESS_TOKEN = "YOUR_TOKEN_HERE";
const BASE_URL = "https://api.themoviedb.org/3";

export const MovieList = ({ type }) => {
  const [movieData, setMovieData] = useState([]);
  
  // FIX 1: Use boolean 'true', not an array '[false]'. 
  // An array [false] is "truthy", which is why your skeleton never goes away.
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  const getData = async () => {
    try {
      // FIX 2: Explicitly set loading to true when starting a fetch
      setLoading(true); 
      const upComingMovieEndPoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
      const response = await fetch(upComingMovieEndPoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMovieData(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      // FIX 3: Turn off loading here so it's tied to the actual data arrival
      setLoading(false);
    }
  };

  // FIX 4: Added the dependency array [type]. 
  // Without this, your code calls getData() thousands of times per second (infinite loop).
  useEffect(() => {
    if (type) getData();
  }, [type]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const handleSeeMore = () => {
    router.push(`/movies/${type}`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-4 pt-[52px]">
      <div className="flex justify-between px-20">
        <p className="text-[24px] font-bold capitalize">{type?.replace('_', ' ')}</p>
        <button
          className="flex items-center justify-center gap-2"
          onClick={handleSeeMore}
        >
          <p className="text-sm font-medium text-[#09090B] cursor-pointer hover:underline">
            See more
          </p>
          <SeeMoreIcon />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-20 gap-8 pb-8">
        {movieData?.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id} // Use movie.id instead of index for better performance
            movieId={movie.id}
            title={movie.title}
            rate={movie.vote_average?.toFixed(1) || "0.0"}
            // FIX 5: Use w500 instead of original. 
            // 'original' images are huge and make your site very slow to load.
            imageUrl={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : "https://via.placeholder.com/500x750?text=No+Image"}
          />
        ))}
      </div>
    </div>
  );
};
