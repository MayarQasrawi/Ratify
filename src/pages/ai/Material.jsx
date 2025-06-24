import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  CheckCircle,
  Circle,
} from "lucide-react";
import Back from "@/components/shared/dashboard/Back";

export default function Material() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studyMaterials = location.state?.material || [];
  const topicName = location.state?.topic || "Study Materials";

  if (studyMaterials.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Study Materials
          </h2>
          <p className="text-gray-600">
            Please provide study materials to get started.
          </p>
        </div>
      </div>
    );
  }

  const nextPage = () => {
    if (currentPage < studyMaterials.length - 1) {
      setCurrentPage(currentPage + 1);
      scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      scrollTo(0, 0);
    }
  };

  const goToPage = (index) => {
    setCurrentPage(index);
    setIsSidebarOpen(false);
  };

  const currentMaterial = studyMaterials[currentPage];

  return (
    <>
      <div className="max-h-screen  bg-gray-50 flex">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block fixed h-screen overflow-y-auto left-0 top-0 z-50 w-72 bg-white border-r border-gray-200 shadow-sm`}
        >
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 font-mono">
                  Study Guide
                </h2>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {Math.round(
                    ((currentPage + 1) / studyMaterials.length) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentPage + 1) / studyMaterials.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <BookOpen size={16} />
              Topic ({studyMaterials.length})
            </h3>
            <div className="space-y-2">
              {studyMaterials.map((item, index) => {
                const isCompleted = index < currentPage;
                const isCurrent = index === currentPage;

                return (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-full cursor-pointer text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      isCurrent
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : isCompleted
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          isCurrent
                            ? "bg-blue-100 text-blue-600"
                            : isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isCompleted && !isCurrent ? (
                          <CheckCircle size={14} />
                        ) : (
                          <span className="text-xs font-semibold">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium text-sm mb-1 ${
                            isCurrent
                              ? "text-blue-900"
                              : isCompleted
                              ? "text-green-800"
                              : "text-gray-800"
                          }`}
                        >
                          {item.chapter}
                        </div>
                        <div
                          className={`text-xs ${
                            isCurrent
                              ? "text-blue-600"
                              : isCompleted
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {item.topic}
                        </div>
                        {isCompleted && !isCurrent && (
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle size={10} className="text-green-500" />
                            <span className="text-xs text-green-600 font-medium">
                              Completed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 lg:ml-72">
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 p-4 bg-blue-100 text-center rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                  <BookOpen size={16} />
                  <span>Topic {currentPage + 1}</span>
                </div>
                <h2 className="text-2xl font-bold  font-mono text-blue-500">
                  {currentMaterial?.topic}
                </h2>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-6">
                <div
                  className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                  dangerouslySetInnerHTML={{
                    __html: currentMaterial?.htmlContent || "",
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 ">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentPage === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border cursor-pointer border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow"
                  }`}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <span className="text-sm font-medium text-blue-700">
                    {currentPage + 1} of {studyMaterials.length}
                  </span>
                </div>
                <button
                  onClick={nextPage}
                  disabled={currentPage === studyMaterials.length - 1}
                  className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentPage === studyMaterials.length - 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow"
                  }`}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </main>
        </div>
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
