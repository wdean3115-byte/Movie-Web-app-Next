"use client";

import { Header } from "@/app/_home/Header";
import { Footer } from "@/app/_home/Footer";
import { MovieCard } from "@/app/_home/MovieCard";
import { useParams } from "next/navigation";
import LoadingSkeleton from "@/app/_icons/LoadingSkeleton";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function Page() {
  const [upcomingData, setUpcomingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const param = useParams();

  const UpcomingDataList = async () => {
    setLoading(true);
    const UpcomingEndpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=${page}`;
    const UpcomingResponse = await fetch(UpcomingEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await UpcomingResponse.json();
    setUpcomingData(data.results);
    setTimeout(() => setLoading(false), 2000);
  };
  useEffect(() => {
    UpcomingDataList();
  });
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Header />
        <LoadingSkeleton />;
        <Footer />
      </div>
    );
  }
  const handleClickPreviousButton = () => {
    {
      setPage(page - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNextButton = () => {
    {
      setPage(page + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center box-border justify-center">
      <Header />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 pt-[52px] items-center">
          <div className="w-[1277px] h-9 flex justify-between items-center ">
            <p className="font-semibold text-2xl leading-8 tracking-[-0.6px] text-[#09090B]">
              {param.type}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-8 px-8">
            {upcomingData.slice(0, 10).map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.title}
                  rate={movie.vote_average}
                  imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
              );
            })}
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (page === 1) {
                    return;
                  } else {
                    handleClickPreviousButton();
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                if (page === 1) {
                  return;
                } else {
                  handleClickPreviousButton();
                }
              }}
            >
              <PaginationLink href="#" isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive={currentPage === page + 1}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={handleClickNextButton}>
              <PaginationLink href="#" isActive={currentPage === page + 2}>
                {page + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleClickNextButton} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Footer />
    </div>
  );
}
