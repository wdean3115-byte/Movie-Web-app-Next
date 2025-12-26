"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
 
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
 
export const Genre = () => {
  const [genreData, setGenreData] = useState([]);
  const router = useRouter();
 
  const getGenreData = async () => {
    const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const response = await fetch(genreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGenreData(data.genres || []);
  };
 
  useEffect(() => {
    getGenreData();
  }, []);
 
  const handleGenreClick = (genreId, genreName) => {
    router.push(`/genre/${genreId}?name=${encodeURIComponent(genreName)}`);
  };
 
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Genre</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[500px] h-[260px] p-4">
              <p className="font-semibold text-[24px]">Genres</p>
              <p className="pt-2 text-gray-500">See lists of movies by genre</p>
              <div className="flex flex-wrap gap-2 pt-4">
                {genreData.map((genre) => (
                  <Badge
                    key={genre.id}
                    className="bg-gray-100 text-black cursor-pointer hover:bg-gray-300"
                    onClick={() => handleGenreClick(genre.id, genre.name)}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
 
 