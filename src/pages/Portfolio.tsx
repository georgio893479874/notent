import Footer from "@/components/portfolio/Footer";
import Header from "@/components/portfolio/Header";
import TrendingArtists from "@/components/portfolio/TrendingArtists";
import MusicLibraries from "@/components/portfolio/MusicLibraries";
import FeaturedArtist from "@/components/portfolio/FeaturedArtist";

const Portfolio = () => {
  return (
    <>
        <Header/>
        <MusicLibraries/>
        <TrendingArtists/>
        <FeaturedArtist/>
        <Footer/>
    </>
  )
}

export default Portfolio;