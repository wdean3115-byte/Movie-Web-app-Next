'use client';
import { MovieCard } from "./MovieCard";
import SeeMoreIcon from "../_icons/SeeMoreIcon";  
import { useEffect, useState } from "react";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
const BASE_URL = "https://api.themoviedb.org/3/";

function TopRatedList() {
   const [movieData, setMovieData] = useState([]);
  const getData = async () => {
    const upComingMovieEndPoint = `${BASE_URL}/movie/top_rated?language=en-US&page=1`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Working.");

    const data = await response.json();
    console.log("Data: ", data);

    setMovieData(data.results);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(movieData, "datdatdtatt");
  return (
    <div className="w-[1440px] max-w-[1440px] ">
      <div className="flex justify-between px-[80px]">
        <p className="text-8xl text-[24px]">TopRated
        </p>
        <button className="flex items-center justify-center gap-2 px-16px">
          <p className="text-sm font-medium text-[#09090B]">See more</p>
          <SeeMoreIcon />
        </button>
      </div>
      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-[80px] gap-[32px]">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rate={movie.vote_average.toFixed(1)}
            imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
        ))}

       
      </div>
    </div>
  );
}


export default TopRatedList;