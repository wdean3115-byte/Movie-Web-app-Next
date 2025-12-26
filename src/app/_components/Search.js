"use client";

import { MovieCard } from "../_home/MovieCard";
import SearchIcon from "../_icons/SearchIcon";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const HeaderSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSeeAllResults = () => {
    router.push(`/searchResult/${encodeURIComponent(searchValue)}`);
  };

  useEffect(() => {
    const SearchDataList = async () => {
      setLoading(true);
      const SearchDataEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`;
      const searchDataResponse = await fetch(SearchDataEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await searchDataResponse.json();
      setSearchData(data.results);
      setLoading(false);
    };

    SearchDataList();
  }, [searchValue]);

  return (
    <div>
      <div className="flex gap-2 items-center pl-3 w-[379px]  h-9 border border-[#E4E4E7]  rounded-md">
        <SearchIcon />
        <input
          placeholder="Search.."
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSeeAllResults();
          }}
          className="border-none outline-none "
        />
      </div>
      {searchValue && (
        <div className="absolute z-100 bg-[#FFFFFF] dark:bg-gray-950 rounded-lg border border-[#E4E4E7] mt-1 w-[577px]">
          {loading ? (
            <div className="flex justify-center items-center w-[553px] h-32">
              <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
            </div>
          ) : (
            <div className="w-full overflow-y-auto px-2">
              {searchData.length > 0 ? (
                <div className=" flex flex-col">
                  {searchData.slice(0, 5).map((movie) => (
                    <MovieCard
                      direction="horizontal"
                      key={movie.Id}
                      title={movie.title}
                      rate={movie.vote_average}
                      imageUrl={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    />
                  ))}
                  <div className="text-sm font-medium leading-5 py-2 px-4 ">
                    See all results for
                  </div>
                </div>
              ) : (
                <div className="h-[95px] flex justify-center items-center">
                  <p>No results found. </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
