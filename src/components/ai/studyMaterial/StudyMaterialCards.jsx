import { FaBook, FaClone, FaQuestionCircle } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { useState } from "react";
import StudyCard from "./StudyCard";
import QuizModel from "../qizz/QuizzModel";
const studyMaterials = [
  {
    id: 1,
    type: "notes",
    title: "Material",
    description: "Read notes to prepare it",
    icon: <FaBook className="text-4xl text-blue-500 mb-2" />,
  },
  {
    id: 2,
    type: "flashcard",
    title: "Flashcard",
    description: "Flashcard to remember the concepts",
    icon: <FaClone className="text-4xl text-green-500 mb-2" />,
  },
  {
    id: 3,
    type: "quiz",
    title: "Quiz",
    description: "Great way to test your knowledge",
    icon: <MdQuiz className="text-4xl text-purple-500 mb-2" />,
  },
 
];

export default function StudyMaterialCards({loading,getMaterial,study}) {
  const [showModel, setShowModel] = useState(null);
  const handleModal = (selected) => {
    setShowModel(selected);
  };
  return (
    <>
      {showModel && (
        <div className="flex justify-center items-center h-screen fixed top-0 z-20 w-full ">
          <QuizModel setModel={setShowModel} type={showModel}/>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-2xl font-mono text-[#3B82F6] font-bold mb-8">
          Study Material
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyMaterials.map((material) => (
            <StudyCard
              key={material.id}
              title={material.title}
              description={material.description}
              onClick={(material.type == "quiz"|| material.type =='flashcard') ? ()=> handleModal(material.type) :material.type =='notes'? getMaterial:''}
              icon={material.icon}
              loading={loading}
              study={study}
            />
          ))}
        </div>
      </div>
    </>
  );
}
