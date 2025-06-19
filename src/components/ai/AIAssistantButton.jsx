import useFetchTrackById from "@/hooks/Admin/tracks/useFetchTrackById";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { FaRobot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function AIAssistantButton() {
  const [showCard, setShowCard] = useState(true);
  const baseUrl = window.location.origin;
  const location = useLocation();
  const { data: track } = useFetchTrackById(location.state.trackId);
  console.log(location, "AIAssistantButton AIAssistantButton");
  console.log(track, "track");
  console.log(baseUrl, "baseUrl");
  const handleCloseCard = () => {
    setShowCard(false);
  };

   const handleClick = () => {
    const newWin = window.open(
      `${baseUrl}/applicant/ai-assistant`,
      "_blank"
    );
    const payload = {
      skill: track.data.associatedSkills,
      name:  track.data.name,
    };
    const handleChildReady = (e) => {
      if (
        e.source === newWin &&             
        e.origin === window.location.origin && 
        e.data?.type === "READY"
      ) {
        newWin.postMessage(
          { type: "DATA", ...payload },
          window.location.origin
        );
        window.removeEventListener("message", handleChildReady);
      }
    };

    window.addEventListener("message", handleChildReady);
  };



  return (
    <div>
      <div onClick={handleClick} className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
          <FaRobot className="text-2xl text-white" />
        </button>
      </div>
      {showCard && (
        <div className="fixed bottom-21 z-30 right-6 bg-white rounded-2xl border-1 border-blue-500 shadow-lg p-6 w-80">
          <button
            onClick={handleCloseCard}
            className="absolute top-4 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <BiX className="cursor-pointer text-lg" />
          </button>
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 ">
              Hello! I am your AI Preparation Assistant, I'm happy to help you,
              ask me now!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
