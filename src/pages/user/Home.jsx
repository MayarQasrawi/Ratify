import HeroSection from "../../components/HeroSection";
import Achievements from "../../components/user/achievements/Achievements";
import Experts from "../../components/user/experts/Experts";
import Navbar from "../../components/user/shared/Navbar";
import Tracks from "../../components/user/tracks/Tracks";
import Work from "../../components/user/works/Work";
import HomePage from "../../components/user/service/HomePage";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HomePage />
      <Tracks />
      <Work />
      <Achievements />
      <Experts />
    </>
  );
}
