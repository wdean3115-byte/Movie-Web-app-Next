"use client";
 
import { Badge } from "@/components/ui/badge";
import SearchIcon from "@/app/_icons/SearchIcon";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/_home/Header";
import { MovieCard } from "@/app/_home/MovieCard";
 
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
 
export default function Page() {
  const { id } = useParams();
  const router = useRouter();
 
  const [genreData, setGenreData] = useState([]);
  const [genres, setGenres] = useState([]);
 
  const getData = async () => {
    const endpoint = `${BASE_URL}/discover/movie?language=en&with_genres=${id}&page=1`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGenreData(data.results || []);
  };
 
  const getGenres = async () => {
    const endpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGenres(data.genres || []);
  };
 
  useEffect(() => {
    getData();
    getGenres();
  }, [id]);
 
  const genreDetail = genres.find((genre) => genre.id == id);
 
  const handleMoreButton = (genreid) => {
    router.push(`/genres/${genreid}`);
  };
 
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-[32px] p-[80px]">
        <div className="text-[#09090B] font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
          Search filter
        </div>
 
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="text-[#09090B] font-inter text-2xl font-semibold leading-8 tracking-[-0.6px]">
                Genres
              </div>
              <div className="text-[#09090B] font-inter text-base font-normal leading-6">
                See lists of movies by genre
              </div>
            </div>
 
            <div className="flex flex-wrap gap-4 sm:w-[400px] md:w-[500px] lg:w-[600px]">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  onClick={() => handleMoreButton(genre.id)}
                  className="flex items-center gap-2 bg-white border border-[#E4E4E7] text-[#09090B] font-inter text-xs font-semibold leading-4 cursor-pointer hover:bg-gray-100"
                >
                  {genre.name}
                  <SearchIcon />
                </Badge>
              ))}
            </div>
          </div>
 
          <div className="flex flex-col">
            <div className="text-[#09090B] font-inter text-2xl font-semibold leading-7 tracking-[-0.5px] mb-4">
              {genreDetail
                ? `${genreData.length} titles in “${genreDetail.name}”`
                : "Initiating..."}
            </div>
 
            <div className="flex flex-row flex-wrap gap-12 w-[1076px]">
              {genreData.slice(0, 12).map((movie, index) => (
                <MovieCard
                  key={index}
                  movieId={movie.id}
                  title={movie.title}
                  rate={movie.vote_average}
                  imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
 