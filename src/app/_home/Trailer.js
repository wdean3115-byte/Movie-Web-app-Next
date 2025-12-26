"use client";
import { useState, useEffect } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "YOUR_TOKEN_HERE";

const Trailer = ({ movieId }) => {
  const [trailerData, setTrailerData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (!movieId) return;
    fetchTrailerData(movieId);
  }, [movieId]);

  const fetchTrailerData = async (id) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[997px] aspect-video flex items-center justify-center bg-black rounded-lg overflow-hidden">
      {loading ? (
        <p className="text-white">Loading trailer...</p>
      ) : trailerData ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerData.key}?autoplay=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="border-none"
        ></iframe>
      ) : (
        <p className="text-white">No trailer available for this movie.</p>
      )}
    </div>
  );
};

export default Trailer;
