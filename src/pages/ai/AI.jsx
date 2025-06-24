import React, { useState, useRef, useEffect } from "react";
import { generateContent } from "../../aiModule/AIModal";
import { FaArrowLeft, FaRobot } from "react-icons/fa";
import { MdArrowForward, MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AILoader from "@/components/ai/shared/AILoader";

export default function AI() {
  const [view, setView] = useState("initial");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const topicRef = useRef(null);
  const difficultyRef = useRef(null);
  const navigate = useNavigate();
  const handleStartAssessment = () => setView("preparing");

  const [incoming, setIncoming] = useState({
    skill: null,
    name: null,
  });

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: "READY" }, window.location.origin);
    }

    const handleMessage = (e) => {
      if (
        e.source === window.opener &&
        e.origin === window.location.origin &&
        e.data?.type === "DATA"
      ) {
        const { skill, name } = e.data;
        console.log("Child got payload:", skill, name);
        setIncoming({ skill, name });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  console.log("incoming", incoming);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(topicRef);

    const topic = topicRef.current.value;
    const difficulty = difficultyRef.current.value;
    if (!topic.trim()) {
      setError("Topic is required.");
      return;
    }
    setError("");
    setLoading(true);
    const response = await generateContent(topic, difficulty);
    if (response) {
      setLoading(false);
      navigate("/applicant/ai-courseOutline", {
        state: { material: response, topic: topic, level: difficulty },
      });
    }
    console.log(response, "res");
  };
  const handleBackClick = () => {
    setView("initial");
    topicRef.current.value = "";
    difficultyRef.current.value = "beginner";
    setError("");
  };
console.log(loading,'AILoader')
if(loading)
  return <AILoader />
  return (
    <>
      {loading && <AILoader />}
      <div className="h-[95vh] flex items-center mx-auto  max-w-5xl ">
        <div className="w-full mx-auto my-8 bg-white rounded-2xl  shadow-lg overflow-hidden">
          <header className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 flex items-center">
            <FaRobot className="h-8 w-8 text-white mr-3" />
            <h1 className="text-2xl font-bold text-white">
              AI Preparation Assistant
            </h1>
          </header>
          <main
            className={`${
              view === "initial"
                ? "flex items-center justify-center py-20"
                : "p-8"
            }`}
          >
            {view === "initial" && (
              <div className="text-center px-4">
                <h2 className="text-4xl font-semibold text-blue-600 mb-4">
                  Prepare for Your {incoming.name} Assessment
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Simply enter your assessment topic, and our AI assistant will
                  instantly generate personalized study materials to help you
                  prepare. Get practice questions, key concepts, example
                  problems, and targeted resources tailored specifically to your
                  upcoming assessment..
                </p>
                <button
                  onClick={handleStartAssessment}
                  className="inline-flex cursor-pointer  items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-300"
                >
                  <span>Start Preparation</span>
                  <MdArrowForward className="h-5 w-5" />
                </button>
              </div>
            )}
            {view === "preparing" && (
              <section className=" lg:w-3/4">
                <button
                  onClick={handleBackClick}
                  className="cursor-pointer flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6"
                >
                  <FaArrowLeft className="h-5 w-5" />
                  <span className="text-lg">Back</span>
                </button>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-md font-medium text-gray-700 mb-2 text-left"
                    >
                      Topic<span className="text-red-500">*</span>
                    </label>
                    <select
                      ref={topicRef}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-500 outline-none "
                    >
                      {incoming.skill.map((sk, ind) => (
                        <option key={ind} value={sk.name}>
                          {sk.name}
                        </option>
                      ))}
                    </select>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="difficulty"
                      className="block text-md font-medium text-gray-700 mb-2 text-left"
                    >
                      Difficulty Level<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="difficulty"
                      ref={difficultyRef}
                      defaultValue="beginner"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-500 outline-none "
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer  w-full inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl transition-colors duration-300"
                  >
                    <span>Generate Study Materials</span>
                    <MdSend className="h-5 w-5" />
                  </button>
                </form>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
