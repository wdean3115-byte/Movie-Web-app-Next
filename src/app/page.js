import { Header } from "./_home/Header";
import HeroSection from "./_home/HeroSection";
import { MovieList } from "./_home/MovieList"; // Using this for all categories
import { Footer } from "./_home/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <HeroSection />
      {/* These will now fetch the correct data based on the type prop */}
      <MovieList type="upcoming" />
      <MovieList type="popular" />
      <MovieList type="top_rated" />
      <Footer />
    </div>
  );
}
