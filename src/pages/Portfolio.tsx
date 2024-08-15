import Footer from "@/components/portfolio/Footer";
import Header from "@/components/portfolio/Header";
import TrendingArtists from "@/components/portfolio/TrendingArtists";
import FeaturedArtist from "@/components/portfolio/FeaturedArtist";
import FeaturedPlaylists from "@/components/portfolio/FeaturedPlaylist";
import Hero from "@/components/portfolio/Hero";

const Portfolio = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <FeaturedPlaylists/>
        <TrendingArtists/>
        <FeaturedArtist/>
        <Footer/>
    </>
  )
}

export default Portfolio;