"use client";
import { MovieCard } from "./MovieCard";
import SeeMoreIcon from "../_icons/SeeMoreIcon";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../_icons/LoadingSkeleton";
import { useRouter } from "next/navigation";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
const BASE_URL = "https://api.themoviedb.org/3/";

export const MovieList = ({ type }) => {
  console.log("type", type);
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const router = useRouter();

  const getData = async () => {
    const upComingMovieEndPoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Working.");
    setTimeout(() => {
      setLoading(false);
    }, 700);

    const data = await response.json();
    console.log("Data: ", data);
    setMovieData(data.results);
  };

  useEffect(() => {
    getData();
  });
  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }
  console.log(movieData, "Initiating");
  const handleSeeMore = () => {
    router.push(`/movies/${type}`);
  };

  return (
    <div className="w-[1440px] max-w-[1440px] flex flex-col gap-4 pt-[52px] ">
      <div className="flex justify-between px-20">
        <p className="text-8xl text-[24px]">{type}</p>
        <button
          className="flex items-center justify-center gap-2 px-16px"
          onClick={handleSeeMore}
        >
          <p className="text-sm font-medium text-[#09090B] cursor-pointer hover:bg-black-200">
            See more
          </p>
          <SeeMoreIcon />
        </button>
      </div>
      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-20 gap-8 pb-8">
        {movieData?.map((movie, index) => (
          <MovieCard
            key={index}
            movieId={movie.id}
            title={movie.title}
            rate={movie.vote_average.toFixed(1)}
            imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};
