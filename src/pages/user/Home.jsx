import HeroSection from "../../components/user/homePage/HeroSection";
import Achievements from "../../components/user/homePage/achievements/Achievements";
import Experts from "../../components/user/homePage/experts/Experts";
import Tracks from "../../components/user/homePage/tracks/Tracks";
import Work from "../../components/user/homePage/works/Work";
import HomePage from "../../components/user/homePage/service/HomePage";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomePage />
      <Work />
      <Tracks />
      <Achievements />
      <Experts />
    </>
  );
}
