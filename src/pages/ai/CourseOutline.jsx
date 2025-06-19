import { useEffect, useState } from "react";
import {
  FaBook,
  FaCode,
  FaLayerGroup,
  FaFileAlt,
  FaPlayCircle,
  FaAward,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { generateMaterial } from "../../aiModule/AIModal";
import StudyMaterialCards from "@/components/ai/studyMaterial/StudyMaterialCards";
import { useMaterialContext } from "@/contexts/MaterialProvider";

export default function CourseOutline() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addMaterial, materials } = useMaterialContext();
  console.log(location.state, "from material");
  console.log(location.state?.topic, "from material", location.state?.level);
  const [courseOutline, setCourseOutline] = useState(
    () => location.state.material
  );
  const [material, setMaterial] = useState({
    isMaterialLoading: false,
    studyMaterial: [],
  });
  useEffect(() => {
    async function getMaterial() {
      setMaterial((prev) => ({ ...prev, isMaterialLoading: true }));
     
        try {
          const res = await generateMaterial(courseOutline.chapters);
          if (res && Array.isArray(res)) {
            console.log("Received data:", res);
            setMaterial((prev) => ({
              ...prev,
              isMaterialLoading: false,
              studyMaterial: [...res],
            }));
            addMaterial(res);
          } else {
            console.warn("Unexpected response from generateMaterial:", res);
            setMaterial((prev) => ({ ...prev, isMaterialLoading: false }));
          }
        } catch (err) {
          console.error("Error while fetching material:", err);
          setMaterial((prev) => ({ ...prev, isMaterialLoading: false }));
        }
      
    }
     if (materials.length == 0) {
      console.log('is enter this aria')
    getMaterial()};
  }, []);
  console.log(material);
  const [activeChapter, setActiveChapter] = useState(null);
  const getMaterial = () => {
    navigate("/applicant/ai-material", {
      state: {
        material: materials,
        topic: location.state.topic,
        level: location.state.level,
      },
    });
    scrollTo(0,0)
  };
  const toggleChapter = (index) => {
    setActiveChapter(activeChapter === index ? null : index);
  };
  console.log(material, "generate");
  return (
    <>
      <header className="bg-[#003F7D] min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] w-full text-white flex justify-center py-10 sm:py-14 md:py-16 rounded-b-[40px] sm:rounded-b-[60px] md:rounded-b-[80px]">
        <div className="w-full px-4 sm:px-6 md:px-0 md:w-[60%] flex flex-col md:flex-row items-center">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              {courseOutline.courseTitle}
            </h1>
            <div className="flex items-center mb-4">
              <span className="border-2 border-blue-500 text-white text-sm font-medium px-5 py-1.5 rounded-full mr-3">
                {courseOutline.difficultyLevel}
              </span>
            </div>
            <p className="text-sm sm:text-md mb-6">{courseOutline.summary}</p>
            <button className="bg-white cursor-pointer text-blue-500 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 flex items-center">
              <FaPlayCircle className="w-5 h-5 mr-2" />
              Start Learning
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-9 py-12">
        <section className="flex  flex-col lg:flex-row lg:items-center mb-5">
          <div className="lg:w-2/3 lg:pr-12">
            <h2 className="text-2xl font-mono text-[#3B82F6] font-bold mb-8">
              Course Chapter
            </h2>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {courseOutline.chapters.map((chapter, index) => (
                <div
                  key={chapter.chapterNumber}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div
                    className={`flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeChapter === index ? "bg-blue-50" : ""
                    }`}
                    onClick={() => toggleChapter(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          activeChapter === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {chapter.chapterNumber}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{chapter.topics.length} Topic</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {activeChapter === index ? (
                        <FaChevronDown className="w-4 h-4 text-blue-500" />
                      ) : (
                        <FaChevronRight className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  </div>
                  {activeChapter === index && (
                    <div className="bg-gray-50 px-5 py-3">
                      <p className="text-gray-700 mb-4">
                        {chapter.description}
                      </p>
                      <ul className="space-y-3 pb-2">
                        {chapter.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                                {topicIndex === 0 ? (
                                  <FaFileAlt className="w-4 h-4" />
                                ) : topicIndex === 1 ? (
                                  <FaCode className="w-4 h-4" />
                                ) : (
                                  <FaLayerGroup className="w-4 h-4" />
                                )}
                              </div>
                              <span>{topic.title}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3 mt-10 lg:mt-0 min-h-[200px]">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#3B82F6]">
                Course Details
              </h3>
              <div className="space-y-6 mt-2">
                <div className="flex items-center">
                  <FaBook className="w-5 h-5 text-blue-600 mr-3" />
                  <p>{courseOutline.chapters.length} Chapter</p>
                </div>
                <div className="flex items-center">
                  <FaAward className="w-5 h-5 text-yellow-600 mr-3" />
                  <p>
                    This Topic Generate By Ai, To genterate content click to
                    button
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <StudyMaterialCards
          loading={material.isMaterialLoading}
          study={materials}
          getMaterial={getMaterial}
        />
      </main>
    </>
  );
}
