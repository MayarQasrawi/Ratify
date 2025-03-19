import React, { useRef } from "react";
import HeroSection from "../../components/user/homePage/HeroSection";
import Achievements from "../../components/user/homePage/achievements/Achievements";
import Experts from "../../components/user/homePage/experts/Experts";
import Tracks from "../../components/user/homePage/tracks/Tracks";
import Work from "../../components/user/homePage/works/Work";
import HomePage from "../../components/user/homePage/service/HomePage";
import Contact from '../../components/user/homePage/Contact';
import Footer from "../../components/user/homePage/footer";
import BackToTop from "../../components/user/trackDetailsPage/shared/BackToTop";

export default function Home() {
  // Create refs for each component
  const heroSectionRef = useRef(null);
  const homePageRef = useRef(null);
  const workRef = useRef(null);
  const tracksRef = useRef(null);
  const achievementsRef = useRef(null);
  const expertsRef = useRef(null);
  const contactRef = useRef(null);
  // Function to scroll to a specific component
  const scrollToComponent = (target) => {
    const refs = {
      heroSection: heroSectionRef,
      homePage: homePageRef,
      work: workRef,
      tracks: tracksRef,
      achievements: achievementsRef,
      experts: expertsRef,
      contact: contactRef,
    };

    if (refs[target] && refs[target].current) {
      refs[target].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={heroSectionRef}>
        <HeroSection />
      </div>
      <div ref={homePageRef}>
        <HomePage />
      </div>
      <div ref={workRef}>
        <Work />
      </div>
      <div ref={tracksRef}>
        <Tracks />
      </div>
      <div ref={achievementsRef}>
        <Achievements />
      </div>
      <div ref={expertsRef}>
        <Experts />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer scrollToComponent={scrollToComponent} />
      <BackToTop/>
    </>
  );
}