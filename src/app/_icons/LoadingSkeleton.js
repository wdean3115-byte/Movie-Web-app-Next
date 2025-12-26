"use client";
 
import SkeletonCards from "@/app/_components/SkeletonCards";
 
export default function LoadingSkeleton() {
  const skeletonArray = Array.from({ length: 10 });
 
  return (
    <div className="w-[1440px] max-w-[1440px] flex flex-col gap-8 animate-pulse">
      <div className="w-[1440px] flex justify-between px-[80px]">
        <div className="bg-gray-300 w-[250px] h-8  rounded-lg "></div>
        <div className="bg-gray-300 w-[165px] h-[35px] rounded-lg"></div>
      </div>
 
      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-[80px] gap-[32px]">
        {skeletonArray.map((_, index) => (
          <SkeletonCards key={index} />
        ))}
      </div>
    </div>
  );
}