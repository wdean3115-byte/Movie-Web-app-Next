"use client";
import { useState, useEffect } from "react";
 
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
 
const Trailer = ({ movieId }) => {
  const [trailerData, setTrailerData] = useState(null);
 
  useEffect(() => {
    if (!movieId) return;
    fetchTrailerData(movieId);
  }, [movieId]);
 
  const fetchTrailerData = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
 
      if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
 
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerData(trailer);
    } catch (error) {
      console.error("Error fetching trailer data:", error);
    }
  };
 
  return (
    <div className="w-[997px] h-[561px] flex items-center justify-center">
      {trailerData ? (
        <iframe
          width="997"
          height="561"
          src={`https://www.youtube.com/embed/${trailerData.key}`}
          title="YouTube video player"
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : (
        <p className="text-white">Initiating trailer...</p>
      )}
    </div>
  );
};
 
export default Trailer;
 
 
 
