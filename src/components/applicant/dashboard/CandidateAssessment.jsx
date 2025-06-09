import React, { useState, useEffect } from "react";
import {
  MdRocketLaunch,
  MdInfo,
  MdCalendarToday,
  MdEventBusy,
  MdLightbulbOutline,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import useGetLevelProgress from "@/hooks/applicant/progress/useGetLevelProgress";
import LevelMeta from "./Level/LevelMeta";
import LevelSidebar from "./Level/LevelSidebar";
import StageList from "./Stages/StageList";
import LevelProgress from "./Level/LevelProgress";
import IconActionButton from "@/components/Button/IconActionButton";
const CandidateAssessment = () => {
  const { enrollmentId, name: trackName } = useParams();
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStages, setShowStages] = useState(false);


  // ✅ MOCK DATA FOR TESTING (Uncomment to use when the server is down)
  const mockData = [
    {
      id: "level-1",
      order: 1,
      levelName: "Basic Fundamentals",
      status: "In Progress",
      startDate: "2025-05-01T00:00:00",
      completionDate: "0001-01-01T00:00:00",
      description: "This level covers the basic building blocks of the track.",
      stagesCount: 5,
      stagesProgressesCount: 3,
    },
    {
      id: "level-2",
      order: 2,
      levelName: "Intermediate Concepts",
      status: "Not Started",
      startDate: "2025-05-10T00:00:00",
      completionDate: "0001-01-01T00:00:00",
      description: "Dive deeper into the core concepts.",
      stagesCount: 6,
      stagesProgressesCount: 0,
    },
    {
      id: "level-3",
      order: 3,
      levelName: "Advanced Projects",
      status: "Completed",
      startDate: "2025-04-01T00:00:00",
      completionDate: "2025-04-20T00:00:00",
      description: "Showcase your skills in full-fledged applications.",
      stagesCount: 4,
      stagesProgressesCount: 4,
    },
  ];

  // Fetch levels
  const { data, isError, isLoading } = useGetLevelProgress({ enrollmentId });

  useEffect(() => {
    const USE_MOCK = false; // ✅ سكرها لما بدك تستخدم الداتا الحقيقية

    if (USE_MOCK) {
      setLevels(mockData);
      const maxOrderLevel = mockData.reduce(
        (max, current) => (current.order > max.order ? current : max),
        mockData[0]
      );
      setSelectedLevel(maxOrderLevel);
      setLoading(false);
    } else if (data && !isLoading && !isError) {
      setLevels(data.data);
      console.log("Levels fetched:", data.data);
      const maxOrderLevel = data.data.reduce(
        (max, current) => (current.order > max.order ? current : max),
        data.data[0]

      );
      setSelectedLevel(maxOrderLevel);
      console.log("Levels fetched:", data.data);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

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
    <div className="max-w-7xl mx-auto px-4 text-[var(--text-color)]">
      {/* header */}
      <div className="mb-3 mt-5 bg-[var(--main-color)] rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <MdRocketLaunch className="text-white text-3xl" />
          <h1 className="text-2xl font-bold text-white">{trackName.toLocaleUpperCase()}</h1>
        </div>
        <div className="h-1 w-24 bg-white/30 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <main className="space-y-6 md:col-span-3">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-[var(--table-border)]">
            {selectedLevel && (
              <>
                <section className="p-6 min-h-[400px]">
                  <div className="flex items-center gap-4 mb-6">
                    {/* <div className="w-14 h-14 rounded-full bg-[var(--main-color)] flex items-center justify-center text-white text-2xl font-bold">
                      {selectedLevel.order}
                    </div> */}
                    <h1 className="md:text-4xl text-4xl font-normal mb-4 text-[var(--main-color)]">
                      {selectedLevel.levelName}
                    </h1>
                  </div>

                  <LevelMeta
                    items={[
                      {
                        icon: <MdInfo size={16} />,
                        label: `Status: ${selectedLevel.status}`,
                      },
                      {
                        icon: <MdCalendarToday size={16} />,
                        label: `Start Date: ${
                          selectedLevel.startDate.split("T")[0]
                        }`,
                      },
                      selectedLevel.completionDate !==
                        "0001-01-01T00:00:00" && {
                        icon: <MdEventBusy size={16} />,
                        label: `Completion Date: ${
                          selectedLevel.completionDate.split("T")[0]
                        }`,
                      },
                      {
                        icon: <MdLightbulbOutline size={20} />,
                        label: `Stages: ${selectedLevel.stagesCount} `,
                      },
                    ].filter(Boolean)}
                  />

                  <p className="rounded-xl text-[var(--main-color)] mt-8 text-xl p-5 bg-blue-400/10 flex gap-5 items-center relative overflow-hidden">
                    <MdLightbulbOutline
                     
                      className="text-[var(--main-color)] w-32"
                    />
                    <span className="text-[var(--main-color)]">
                      {selectedLevel.description}
                    </span>
                  </p>

                  <div className="mt-6">
                    <LevelProgress
                      stagesCount={selectedLevel.stagesCount}
                      stagesProgressesCount={
                        selectedLevel.stagesProgressesCount
                      }
                    />
                  </div>


                  <div className=" mt-6">
                      <IconActionButton
                    onClick={() => setShowStages(!showStages)}
                    Icon={showStages ? MdEventBusy : MdCalendarToday}
                    label={showStages ? "Hide Stages" : "Show Stages"}
                    ariaLabel={showStages ? "Hide Stages" : "Show Stages"}
                    color="purple"
                    className="mt-6"
                  />
                  </div>
                 
                </section>

                {showStages && (
                  <section className="mt-4">
                    <StageList
                      levelProgressId={selectedLevel.id}
                      onStageClick={handleStageClick}
                    />
                  </section>
                )}
              </>
            )}
          </div>
        </main>

        <aside className="lg:col-span-1">
          <LevelSidebar
            selectedLevel={selectedLevel}
            levels={levels}
            setSelectedLevel={setSelectedLevel}
          />
        </aside>
      </div>
    </div>
  );
};

export default CandidateAssessment;
