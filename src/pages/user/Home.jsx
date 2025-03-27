import HeroSection from "../../components/user/homePage/HeroSection";
import Achievements from "../../components/user/homePage/achievements/Achievements";
import Experts from "../../components/user/homePage/experts/Experts";
import Tracks from "../../components/user/homePage/tracks/Tracks";
import Work from "../../components/user/homePage/works/Work";
import  Service from "../../components/user/homePage/service/Service";
import Contact from "../../components/user/homePage/Contact";
import Footer from "../../components/user/shared/Footer";
import BackToTop from "../../components/user/trackDetailsPage/shared/BackToTop";

export default function Home() {

  return (
    <>
      <HeroSection />

      <div id="about">
        < Service />
      </div>
      <Work />
      <Tracks />

      <Achievements />

      <Experts />
      <div id="contact">
        <Contact />
      </div>

      <BackToTop />
    </>
  );
}
