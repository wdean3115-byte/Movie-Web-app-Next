// MovieList.js (Reusable Component)
"use client";
import { MovieCard } from "./MovieCard";
import SeeMoreIcon from "../_icons/SeeMoreIcon";
import { useEffect, useState } from "react";

const ACCESS_TOKEN = "YOUR_TOKEN";
const BASE_URL = "https://api.themoviedb.org/3/";

export default function MovieList({ title, endpoint }) {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setMovieData(data.results?.slice(0, 10) || []);
      } catch (e) { console.error(e); }
    };
    getData();
  }, [endpoint]); // Re-fetch if endpoint changes

  return (
    <div className="w-full max-w-[1440px] mx-auto py-8">
      <div className="flex justify-between items-center px-4 md:px-20 mb-6">
        <h2 className="text-[24px] font-semibold">{title}</h2>
        <button className="flex items-center gap-2 hover:opacity-60 transition">
          <span className="text-sm font-medium">See more</span>
          <SeeMoreIcon />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-20 gap-8">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rate={movie.vote_average?.toFixed(1)}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}
