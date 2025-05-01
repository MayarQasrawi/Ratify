import React, { useState, useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi";
import LevelProgress from "./LevelProgress";
import StageCard from "./StageCard";

const mockLevels = [
  {
    id: 1,
    name: "Junior Developer",
    description: "Entry-level developer assessment",
    stages: [
      {
        id: "exam-1",
        type: "exam",
        title: "Technical Knowledge Assessment",
        status: "completed",
        score: 85,
        maxScore: 100
      },
      {
        id: "task-1",
        type: "task",
        title: "Frontend Component Implementation",
        status: "in-progress",
        dueDate: "2025-04-25"
      },
      {
        id: "interview-1",
        type: "interview",
        title: "Technical Interview",
        status: "pending",
        scheduledDate: null
      }
    ]
  },
  {
    id: 2,
    name: "Mid-level Developer",
    description: "Intermediate developer assessment",
    stages: [
      {
        id: "exam-2",
        type: "exam",
        title: "Advanced Technical Assessment",
        status: "pending"
      },
      {
        id: "task-2",
        type: "task",
        title: "Full-stack Feature Implementation",
        status: "locked"
      },
      {
        id: "interview-2",
        type: "interview",
        title: "Technical & Behavioral Interview",
        status: "locked"
      }
    ]
  }
];

const CandidateAssessment = ({ trackId }) => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLevels(mockLevels);
      setSelectedLevel(mockLevels[0]);
      setLoading(false);
    }, 800);
  }, [trackId]);

  const handleStageClick = (stage) => {
    console.log("Opening stage:", stage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--main-color)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-8">Assessment Journey</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-[var(--sidebar-bg)] text-center text-[var(--sidebar-text)] border border-[var(--table-border)] rounded-xl p-4 shadow-sm sticky top-4 h-fit max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4  p-2 bg-[var(--sidebar-text)] text-white rounded-lg">Assessment Levels</h2>
          <div className="space-y-2">
            {levels.map((level) => (
              <button
                key={level.id}
                className={`w-full  px-3 py-2 text-center rounded-md font-medium transition-colors ${
                  selectedLevel?.id === level.id
                    ? "bg-[var(--sidebar-icon-bg)] text-[var(--main-color)]"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                {level.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-6">
          {selectedLevel && (
            <>
              <section className="bg-white dark:bg-[var(--background-color)] border border-[var(--table-border)] rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold">{selectedLevel.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{selectedLevel.description}</p>

                <div className="mt-4">
                  <LevelProgress level={selectedLevel} />
                </div>

                <div className="mt-6 flex items-center space-x-2 bg-[var(--sidebar-icon-bg)] px-4 py-2 rounded-md">
                  <HiInformationCircle className="w-5 h-5 text-[var(--main-color)]" />
                  <span className="text-sm text-[var(--text-color)]">Complete all stages to advance</span>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-4">Assessment Stages</h3>
                <div className="space-y-4">
                  {selectedLevel.stages.map((stage) => (
                    <StageCard key={stage.id} stage={stage} onClick={handleStageClick} />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CandidateAssessment;
