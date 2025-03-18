import HeroSection from "../../components/user/homePage/HeroSection";
import Achievements from "../../components/user/homePage/achievements/Achievements";
import Experts from "../../components/user/homePage/experts/Experts";
import Tracks from "../../components/user/homePage/tracks/Tracks";
import Work from "../../components/user/homePage/works/Work";
import HomePage from "../../components/user/homePage/service/HomePage";
import Contact from '../../components/user/homePage/Contact';
import EmailChangeModal from "../../components/shared/EmailChangeModal";
export default function Home() {
  return (
    <>
      <HeroSection />
      <HomePage />
      <Work />
      <Tracks />
      <Achievements />
      <Experts />
      <Contact/>
    </>
  );
}
