
import { Header } from "./_home/Header";
import HeroSection from "./_home/HeroSection";
import  PopularList  from "./_home/PopularMovieList";
import  TopRatedList  from "./_home/TopRatedMovieList";
import UpcomingList from "./_home/UpcomingMovieList";
import { Footer } from "./_home/Footer";
import { MovieList } from "./_home/MovieList";


import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <Header />
      <HeroSection/>
     < MovieList type="upcoming"/>
     < MovieList type="popular"/>
     < MovieList type="top_rated"/>
      <Footer/>
    </div>
  );
}
 
