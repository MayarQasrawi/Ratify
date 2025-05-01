import React from "react";
import Header from "../../Header";
import TracksCard from "./TracksCard";
import front from "../../../assets/img/tracks/frontEnd.png"; // Import your image
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import useAutoFocus from "../../../hooks/useAutoFocus";

const tracks = [
  {
    id: 1,
    header: "Frontend",
    description:
      "JavaScript-based open-source front-end web framework for developing single-page applications",
    img: front,
  },
  {
    id: 2,
    header: "Backend",
    description:
      "Server-side development focusing on databases, scripting, and website architecture",
    img: front,
  },
  {
    id: 3,
    header: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    img: front,
  },
  {
    id: 4,
    header: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    img: front,
  },
  {
    id: 5,
    header: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    img: front,
  },
];

export default function Tracks() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputSearch = useAutoFocus();
  let isLoading = false;
  let filteredTracks = tracks;
  if (searchQuery)
    filteredTracks = tracks.filter(
      (track) =>
        track.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  if (filteredTracks.length == 0 && isLoading == false)
    return (
      <>
        {" "}
        <div className="flex justify-between p-10 ">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 text-gray-500 flex items-center pl-3">
              {<BiSearchAlt2 />}
            </span>
            <input
              ref={inputSearch}
              type="text"
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" transition-shadow duration-200 pl-10
    w-80 px-4 bg-gray-200 py-2 border focus:caret-blue-500 border-gray-300 rounded-lg outline-none "
            />
          </div>
        </div>{" "}
        <div className="h-[60vh] flex items-center justify-center">
          <p>No Track found </p>
        </div>
      </>
    );

  return (
    <>
      {/* Search Input */}
      <div className="flex justify-between p-10 ">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 text-gray-500 flex items-center pl-3">
            {<BiSearchAlt2 />}
          </span>
          <input
            ref={inputSearch}
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" transition-shadow duration-200
            pl-10
            w-80 px-4 bg-gray-200 py-2 border focus:caret-blue-500 border-gray-300 rounded-lg outline-none "
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16  p-10 ">
        {isLoading
          ? Array.from({ length: 8 }, (_, ind) => (
              <div
                key={ind}
                className="rounded-lg mx-auto h-65 bg-gray-200 w-[300px] animate-pulse "
              ></div>
            ))
          : filteredTracks.map((track, index) => (
              <TracksCard
                key={index}
                header={track.header}
                description={track.description}
                img={track.img}
                id={track.id}
              />
            ))}
      </div>
    </>
  );
}
