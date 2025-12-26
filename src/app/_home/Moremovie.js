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
  const [loading, setLoading] = useState(true); // FIX: Boolean true
  const router = useRouter();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/movie/${type}?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMovieData(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type) getData();
  }, [type]); // FIX: Dependency array to prevent infinite loops

  const handleSeeMore = () => {
    // Ensure this path matches your folder structure exactly
    router.push(`/movies/${type}`); 
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-4 pt-[52px]">
      <div className="flex justify-between px-20">
        <p className="text-[24px] font-bold capitalize">{type?.replace('_', ' ')}</p>
        <button
          className="flex items-center gap-2 cursor-pointer group"
          onClick={handleSeeMore} 
        >
          <span className="text-sm font-medium group-hover:underline">See more</span>
          <SeeMoreIcon />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-20 gap-8 pb-8">
        {movieData?.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            rate={movie.vote_average?.toFixed(1)}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};
