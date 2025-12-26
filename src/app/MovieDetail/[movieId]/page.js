"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/app/_home/Header";
import { Footer } from "@/app/_home/Footer";
import Trailer from "@/app/_home/Trailer";
import { useRouter } from "next/navigation";
import StarIcon from "@/app/_icons/StarIcon";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MoviePage() {
  const router = useRouter();
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        const data = await res.json();
        setMovieDetails(data);
      } catch (err) {
        console.error("Initiating Self destruction sequence 4,3,2,1,:", err);
      }
    }
    if (movieId) fetchMovieDetails();
  }, [movieId]);
  useEffect(() => {
    async function fetchTeamDetails() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        const data = await res.json();
        setTeamDetails(data);
      } catch (err) {
        console.error("Initiating Self destruction sequence 4,3,2,1,", err);
      }
    }
    if (movieId) fetchTeamDetails();
  }, [movieId]);

  useEffect(() => {
    async function fetchSimilarMovies() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        const data = await res.json();
        setSimilarMovies(data.results || []);
      } catch (err) {
        console.error("Initiating Self destruction sequence 4,3,2,1,", err);
      }
    }
    if (movieId) fetchSimilarMovies();
  }, [movieId]);

  if (!movieDetails || !teamDetails) {
    return (
      <div className="flex items-center justify-center h-screen font-inter text-lg text-gray-700">
        Initiating......
      </div>
    );
  }
  const img_url = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
  const poster_url = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;
  const releaseDate = movieDetails.release_date
    ? movieDetails.release_date.replaceAll("-", ".")
    : "—";

  const parentalRating = movieDetails.adult ? "R" : "PG";
  const runtime = `${Math.floor(movieDetails.runtime / 60)}h ${
    movieDetails.runtime % 60
  }m`;

  const stars =
    teamDetails.cast
      ?.sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((m) => m.name)
      .join(" · ") || "—";

  const Writers =
    teamDetails.crew
      ?.sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((m) => m.name)
      .join(" · ") || "—";

  const Directors =
    teamDetails.crew
      ?.filter((m) => m.job === "Director")
      .map((m) => m.name)
      .join(" · ") || "—";

  return (
    <div className="flex flex-col items-center gap-8">
      <Header />

      <div className="w-[1080px] h-[524px] top-[191px] left-[180px] gap-6 rotate-0 opacity-100 flex flex-col">
        <div className="flex w-full h-[72px] justify-between pr-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-inter font-extrabold text-[36px] leading-10 tracking-[-0.025em]">
              {movieDetails.title}
            </h1>
            <p className="font-inter text-[18px] leading-7">
              {releaseDate} · {parentalRating} · {runtime}
            </p>
          </div>
          <div className="w-[83px] h-16 gap-0 rotate-0 opacity-100 ">
            <p className="font-inter font-bold text-[12px] leading-4 tracking-normal w-[83px] h-4 rotate-0 opacity-100 text-end">
              Rating
            </p>
            <div className="gap-1 flex flex-row  rotate-0 opacity-100   ">
              <div className="w-7 h-7 flex justify-center items-center"></div>
              <div>
                <div className="flex flex-row items-center gap-2">
                  <p className="font-inter font-semibold text-[18px] leading-7 tracking-[0]">
                    ⭐{movieDetails.vote_average}
                  </p>
                  <p className="text-18px">/10</p>
                </div>

                <p className="text-end text-12px">{movieDetails.vote_count} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full h-[428px] gap-8">
          <Image
            src={poster_url}
            alt={movieDetails.title}
            width={290}
            height={428}
            className="rounded-lg object-cover"
            priority // Recommended for "above the fold" images
          />

          <Image
            src={img_url}
            alt={movieDetails.title}
            width={760}
            height={428}
            className="object-cover rounded-lg relative"
          />
        </div>
      </div>
      <div className="w-[1080px] flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {movieDetails.genres?.length ? (
            movieDetails.genres.map((g) => (
              <span
                key={g.id}
                className="border border-zinc-300 bg-zinc-50 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))
          ) : (
            <span>—</span>
          )}

          {!showTrailer && (
            <button
              className="w-[145px] h-10 rounded-md gap-2 flex items-center justify-center
                      bg-zinc-50 text-black font-semibold hover:bg-gray-200 transition cursor-pointer border border-zinc-300 "
              onClick={() => setShowTrailer(true)}
            >
              {" "}
              ▷Watch trailer
            </button>
          )}
          {showTrailer && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
              <Trailer movieId={movieId} />
              <button
                className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer"
                onClick={() => setShowTrailer(false)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <p className="font-inter text-[16px] leading-6 text-gray-800">
          {movieDetails.overview}
        </p>
        <div className="flex gap-2">
          <p className="font-inter font-bold w-20">Director:</p>
          <p>{Directors}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-inter font-bold w-20">Writers:</p>
          <p>{Writers}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-inter font-bold w-20">Stars:</p>
          <p>{stars}</p>
        </div>
      </div>
      <div className="w-[1080px] flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h3 className="font-inter font-semibold text-[24px] text-blue-950 leading-8 tracking-[-0.025em]">
            More like this
          </h3>
          <button
            className="text-black  cursor-pointer border border-zinc-300 bg-zinc-50  font-semibold hover:bg-gray-200 transition"
            onClick={() => router.push(`/similar/${movieId}`)}
          >
            See all
          </button>
        </div>

        <button className="flex gap-8 overflow-x-auto">
          {similarMovies.length > 0 ? (
            similarMovies.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                className="shrink-0 w-[190px]"
                onClick={() => router.push(`/MovieDetail/${movie.id}`)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500} // This is the base width from the TMDB URL
                  height={282} // Matches your h-[282px]
                  className="rounded-lg w-full h-[282px] object-cover cursor-pointer"
                />
                <div className="flex flex-row items-center rotate-0 opacity-100 pt-1 pr-2 pb-1 pl-2 ">
                  <StarIcon />
                  {movie.vote_average}/10
                </div>
                <div className="w-[190px] items-start justify-start rotate-0 opacity-100 pt-1 pr-2 pb-1 pl-2 font-inter font-medium text-[16px] leading-6 text-gray-800">
                  {movie.title}
                </div>
              </div>
            ))
          ) : (
            <p>Not found $$$$$</p>
          )}
        </button>
      </div>

      <Footer />
    </div>
  );
}
