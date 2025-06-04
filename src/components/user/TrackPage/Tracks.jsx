import React from "react";
import Header from "../../Header";
import TracksCard from "./TracksCard";
import front from "../../../assets/img/tracks/frontEnd.png"; // Import your image
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import useAutoFocus from "../../../hooks/useAutoFocus";
import useGetAllTraks from "../../../hooks/admin/tracks/useGetAllTracks";
import useGetActiveTraks from "../../../hooks/user/useGetActiveTrack";

const tracks = [
  {
    id: 1,
    name: "Frontend",
    description:
      "JavaScript-based open-source front-end web framework for developing single-page applications",
    image: front,
  },
  {
    id: 2,
    name: "Backend",
    description:
      "Server-side development focusing on databases, scripting, and website architecture",
    image: front,
  },
  {
    id: 3,
    name: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    image: front,
  },
  {
    id: 4,
    name: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    image: front,
  },
  {
    id: 5,
    name: "DevOps",
    description:
      "Practices that combine software development and IT operations to shorten the development lifecycle",
    image: front,
  },
];

export default function Tracks() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputSearch = useAutoFocus();
  const {data:track,isLoading:isTrackLoading,isError}= useGetActiveTraks()
    console.log(track?.data,'active hhhhhhhhhhhhhhhhhhhhhhhhkkkkkkkkkkkkkkkkkk',isTrackLoading)

  // let isLoading = false;
  let filteredTracks = track?.data;
  if (searchQuery)
    filteredTracks = track?.data.filter(
      (track) =>
        track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  if (filteredTracks?.length == 0 && isTrackLoading == false)
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
       {!isTrackLoading && <div className="relative">
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
        </div>}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16  p-10 ">
        {isTrackLoading
          ? Array.from({ length: 8 }, (_, ind) => (
              <div
                key={ind}
                className="rounded-lg mx-auto h-65 bg-gray-200 w-[300px] animate-pulse "
              ></div>
            ))
          : filteredTracks.map((track, index) => (
              <TracksCard
                key={index}
                header={track.name}
                description={track.description}
                img={track.image}
                id={track.id}
              />
            ))}
      </div>
    </>
  );
}
