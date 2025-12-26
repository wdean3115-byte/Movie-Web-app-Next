"use client";
import Moviecard from "@/app/_components/MovieCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PreviuosIcon } from "@/app/_icons/PreviuosIcon";
import LoadingSkeleton from "../_icons/LoadingSkeleton";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Moremovies({ type }) { 
  const router = useRouter();
  const [movieData, setMovieData] = useState([]);
  
  // FIX: Start as 'true' boolean. (Avoid [false] array which is always truthy)
  const [loading, setLoading] = useState(true); 

  const getData = async () => {
    try {
      setLoading(true);
      const upComingMovieEndPoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
      const response = await fetch(upComingMovieEndPoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMovieData(data.results || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      // Small timeout to allow the browser to transition smoothly
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    if (type) {
      getData();
    }
  }, [type]); // Dependency array ensures this runs when type is available

  if (loading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto py-10">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8 py-10">
      <div className="flex justify-between px-4 md:px-20">
        <p className="text-[24px] font-bold capitalize">{type?.replace('_', ' ')}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-20 gap-8">
        {movieData.map((movie) => (
          <Moviecard
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            rate={movie.vote_average?.toFixed(1)}
            // Ensure the Moviecard component is ready for the full URL
            imageUrl={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : null}
          />
        ))}
      </div>
      
      <div className="px-20 mt-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 hover:opacity-50 transition cursor-pointer">
          <PreviuosIcon /> <span>Back</span>
        </button>
      </div>
    </div>
  );
}
