import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaSync } from "react-icons/fa";
import FlashCard from "@/components/ai/flashcard/FlashCard";

export default function FlashcardPage() {
  const location = useLocation();
  const cards = location.state?.flashcards || [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const navigate = (dir) => {
    setFlipped(false);
    setIndex((prev) => {
      if (dir === "prev") return prev === 0 ? cards.length - 1 : prev - 1;
      return prev === cards.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="bg-blue-100 rounded-md text-center p-4 w-[90%]">
        <h1 className="text-3xl font-bold font-mono text-[#3B82F6]">
          {" "}
          Flash Card
        </h1>
      </div>
      <div className="w-full max-w-lg mt-4">
        <FlashCard
          card={cards[index]}
          flipped={flipped}
          onToggle={() => setFlipped((f) => !f)}
        />

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate("prev")}
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 cursor-pointer"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={() => navigate("next")}
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 cursor-pointer"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
