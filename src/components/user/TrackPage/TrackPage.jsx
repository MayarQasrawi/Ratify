import React from "react";
import Header from "../../Header";
import TracksCard from "./TracksCard";
import front from "../../../assets/img/tracks/frontEnd.png"; // Import your image
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const tracks = [
  {
    header: "Frontend",
    description:
      "JavaScript-based open-source front-end web framework for developing single-page applications",
    img: <img src={front} alt="Frontend" className="w-40 h-40 mt-8" />,
  },
  {
    header: "Backend",
    description:
      "Server-side development focusing on databases, scripting, and website architecture",
    img: <img src={front} alt="Backend" className="w-40 h-40 mt-8" />,
  },
  {
    header: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    img: <img src={front} alt="DevOps" className="w-40 h-40 mt-8" />,
  },
  {
    header: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    img: <img src={front} alt="DevOps" className="w-40 h-40 mt-8" />,
  },
  // Add more tracks as needed
];

function TrackPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tracks based on search query
  const filteredTracks = tracks.filter(
    (track) =>
      track.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="flex justify-center  text-xl lg:text-4xl text-[#3B82F6] mt-10 md:px-16 items-center">
        <h1>
          {" "}
          <span className="text-[#2A5C8A]">OUR </span>TRACKS{" "}
        </h1>
      </div>

      {/* Search Input */}
      <div className="flex justify-between p-4 ">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 text-gray-500 flex items-center pl-3">
            {<BiSearchAlt2 />}
          </span>
          <input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" transition-shadow duration-200
            pl-10
            w-80 px-4 bg-gray-200 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <section className="flex flex-wrap gap-16 mb-20% bg-gray-200 p-10 h-screen justify-center">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track, index) => (
            <TracksCard
              key={index} // Use a unique key for each card
              header={track.header}
              description={track.description}
              img={track.img}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tracks found.
          </p>
        )}
      </section>
    </>
  );
}

export default TrackPage;
