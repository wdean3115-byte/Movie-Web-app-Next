"use client";
import { useState, useEffect } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const Trailer = ({ movieId }) => {
  const [trailerData, setTrailerData] = useState(null);
  const [error, setError] = useState(false);

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
      // Look for a Trailer first, if not found, look for a Teaser
      const trailer = data.results.find(
        (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
      );
      
      if (trailer) {
        setTrailerData(trailer);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching trailer data:", error);
      setError(true);
    }
  };

  return (
    <div className="w-[997px] h-[561px] flex items-center justify-center bg-black rounded-lg">
      {trailerData ? (
        <iframe
          width="100%"
          height="100%"
          // Added ?autoplay=1 to start immediately
          src={`https://www.youtube.com/embed/${trailerData.key}?autoplay=1`}
          title="YouTube video player"
          // CRITICAL: Added more allow permissions
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg shadow-2xl"
        ></iframe>
      ) : error ? (
        <p className="text-white">Trailer not available.</p>
      ) : (
        <p className="text-white">Initiating trailer...</p>
      )}
    </div>
  );
};

export default Trailer;
