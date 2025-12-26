"use client";
import Moviecard from "@/app/_components/MovieCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PreviuosIcon } from "@/app/_icons/PreviuosIcon";
import LoadingSkeleton from "../_icons/LoadingSkeleton";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "YOUR_TOKEN_HERE";

export default function Moremovies({ type }) { // Destructured type from props
  const router = useRouter();
  const [movieData, setMovieData] = useState([]);
  
  // FIX 1: Initialized as boolean false, not an array [false]
  const [loading, setLoading] = useState(true); 

  const getData = async () => {
    try {
      setLoading(true);
      const endpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setMovieData(data.results || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // FIX 2: Moved setLoading to finally to ensure it stops loading
      setLoading(false); 
    }
  };

  // FIX 3: Added dependency array [type] so it runs once or when type changes
  useEffect(() => {
    if (type) getData();
  }, [type]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 py-10">
      <div className="flex justify-between px-4 md:px-20">
        <h2 className="text-[24px] font-bold capitalize">{type?.replace('_', ' ')}</h2>
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm hover:underline"
        >
          <PreviuosIcon /> Back
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-20 gap-8">
        {movieData.slice(0, 10).map((movie) => (
          <Moviecard
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            rate={movie.vote_average?.toFixed(1)}
            // FIX 4: Pass the full URL for the image
            imageUrl={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : "/no-poster.png"}
          />
        ))}
      </div>
    </div>
  );
}
