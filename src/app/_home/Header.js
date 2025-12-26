"use client";
import MovieZIcon from "../_icons/MovieZicon";
import { Genre } from "../_components/Genre";
import DarkModeIcon from "../_icons/DarkModeIcon";
import { useRouter } from "next/navigation";
import { HeaderSearch } from "../_components/Search";

export const Header = () => {
  const router = useRouter();
  const handdleHomePage = () => {
    router.push("/");
  };
  return (
    <div className=" w-full h-[59px] flex items-center justify-center py-4">
      <div className=" w-7xl h-auto flex justify-between items-center">
        <div
          className="flex gap-2  items-center text-[#4338CA] text-base italic font-bold leading-5 tracking-[0.32px] cursor-pointer hover:bg-black-200"
          onClick={handdleHomePage}
        >
          <MovieZIcon />
          Movie Z
        </div>
        <div className="flex gap-3 items-center ">
          <Genre />
          <div>
            <HeaderSearch />
          </div>
        </div>
        <button className="w-9 h-9 flex items-center justify-center border border-[#E4E4E7]  rounded-md cursor-pointer hover:bg-black-200 ">
          <DarkModeIcon />
        </button>
      </div>
    </div>
  );
};
