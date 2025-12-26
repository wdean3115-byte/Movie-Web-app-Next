"use client";
import Moviecard from "@/app/_components/MovieCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PreviuosIcon } from "@/app/_icons/PreviuosIcon";
import LoadingSkeleton from "../_icons/LoadingSkeleton";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Moremovies(props) {
  const router = useRouter();

  const { type } = props;
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState([false]);

  const getData = async () => {
    setLoading(true);
    const upComingMovieEndPoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Working.");

    const data = await response.json();
    console.log("Data: ", data);

    setTimeout(() => {
      setLoading(false);
    }, 5000);
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

  return (
    <div className="w-[1440px] max-w-[1440px] flex flex-col gap-8">
      <div className="flex justify-between px-20">
        <p className="text-[24px]">{type}</p>
      </div>
      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-20 gap-8">
        {movieData.slice(0, 10).map((movie) => (
          <Moviecard
            key={movie.id}
            title={movie.title}
            rate={movie.vote_average}
            imageUrl={movie.poster_path}
          />
        ))}
      </div>
      <div>
        <button>
          <PreviuosIcon />
        </button>
      </div>
    </div>
  );
}
