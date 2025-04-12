import { useState } from "react";
import img from "../../../assets/img/tracks/frontEnd.png";
export default function HorizontalTrackDetailsPage() {
  const [trackData, setTrackData] = useState(mockTrackData);

  return (
    <div className="min-h-[85vh] block  md:flex md:items-center">
      <div className="md:container md:mx-auto sm:px-4 py-6 ">
        <div className=" bg-white shadow-lg sm:rounded-2xl mb-8 border border-blue-50">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 pb-0 p-4 sm:pb-4 ">
              <h1 className="text-md sm:text-[20px] md:text-2xl lg:text-3xl font-bold text-[var(--main-color)] mb-3">
                {trackData.name}
              </h1>
              <p className="text-sm  hidden md:block text-gray-600 mb-4">
                {trackData.description}
              </p>

              <div className="mb-4 flex items-center">
                <span className="text-sm sm:text-md font-medium text-gray-800">
                  Status:
                </span>
                <span
                  className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-semibold 
                    ${
                      trackData.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {trackData.status ? "Active" : "Inactive"}
                </span>
              </div>

              <img
                src={trackData.image}
                alt={trackData.name}
                className="hidden lg:block lg:w-[40%] mx-auto mt-4"
              />
            </div>
            <div className="lg:w-1/3 lg:bg-blue-50  pb-6 lg:p-4 px-4 lg:border-t  lg:border-blue-100">
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--main-color)] mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {trackData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition duration-300 
                    ${
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-800 hover:bg-[var(--main-color)] hover:text-white"
                        : "bg-[var(--main-color)] text-white hover:bg-blue-100 hover:text-blue-800"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data stays the same
const mockTrackData = {
  id: "TR-2023-001",
  name: "Full Stack Development ",
  description:
    "Comprehensive program covering both frontend and backend development technologies with hands-on projects and real-world applications.",
  image: img,
  status: true,
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
    "TypeScript",
    "REST API",
  ],
  plan: [
    {
      level: "Beginner",
      stages: [
        {
          id: "BG-1",
          title: "Web Fundamentals",
          description: "HTML, CSS and basic web concepts",
        },
        {
          id: "BG-2",
          title: "JavaScript Basics",
          description: "Core JavaScript concepts and DOM manipulation",
        },
        {
          id: "BG-3",
          title: "HTML & CSS",
          description: "Advanced HTML5 features and CSS3 styling",
        },
      ],
    },
    {
      level: "Intermediate",
      stages: [
        {
          id: "IM-1",
          title: "React Fundamentals",
          description: "Components, props, state, and React hooks",
        },
        {
          id: "IM-2",
          title: "State Management",
          description: "Redux, Context API, and performance optimization",
        },
        {
          id: "IM-3",
          title: "API Integration",
          description: "Fetching and managing API data in React applications",
        },
      ],
    },
    {
      level: "Advanced",
      stages: [
        {
          id: "AD-1",
          title: "Backend with Node.js",
          description: "Building RESTful APIs with Express.js",
        },
        {
          id: "AD-2",
          title: "Database Design",
          description: "MongoDB schema design and performance optimization",
        },
        {
          id: "AD-3",
          title: "Deployment & DevOps",
          description: "Docker, CI/CD pipelines, and cloud deployment",
        },
      ],
    },
  ],
};
