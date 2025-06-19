import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Video,
  Calendar,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Star,
  Eye,
} from "lucide-react";
import Title from "@/components/admin/shared/Title";
import Table from "@/components/admin/shared/Table";
import CommentModal from "@/components/examiner/feedback/CommentModal";
import useGetExaminerFeedback from "@/hooks/examiner/feedback/useGetExaminerFeedback";
import Loading from "@/components/admin/shared/Loading";

const columns = ["Applicant", "Type", "Score", "Feedback", " "];

export default function ManageFeedback() {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [modalContent, setModalContent] = useState();
  const { data: feedback, isLoading, isError } = useGetExaminerFeedback();
  const statistics = useMemo(() => {
    const data = feedback?.data;
    const totalFeedback = feedback && data.length;
    const averageScore =
      data?.reduce((sum, fb) => sum + fb.totalScore, 0) / totalFeedback;
    const typeStats = data?.reduce((acc, fb) => {
      let type = "General";
      if (fb.examInfo) type = "Exam";
      else if (fb.taskSubmissionInfo) type = "Task";
      else if (fb.interviewInfo) type = "Interview";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const scoreRanges = data?.reduce(
      (acc, fb) => {
        if (fb.totalScore >= 90) acc.excellent++;
        else if (fb.totalScore >= 80) acc.good++;
        else if (fb.totalScore >= 70) acc.satisfactory++;
        else acc.needsImprovement++;
        return acc;
      },
      { excellent: 0, good: 0, satisfactory: 0, needsImprovement: 0 }
    );

    const recentFeedback = data?.filter((fb) => {
      const feedbackDate = new Date(fb.feedbackDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return feedbackDate >= weekAgo;
    }).length;

    return {
      totalFeedback,
      averageScore: Math.round(averageScore * 10) / 10,
      typeStats,
      scoreRanges,
      recentFeedback,
    };
  }, [feedback]);

  const getScoreStyle = (score) => {
    if (score >= 90)
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800";
    if (score >= 80)
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
    if (score >= 70)
      return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800";
    if (score >= 60)
      return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
  };

  const getFeedbackType = (feedback) => {
    if (feedback.examInfo)
      return { type: "Exam", icon: HelpCircle, color: "blue" };
    if (feedback.taskSubmissionInfo)
      return { type: "Task", icon: FileText, color: "purple" };
    if (feedback.interviewInfo)
      return { type: "Interview", icon: Video, color: "green" };
    return { type: "General", icon: MessageCircle, color: "gray" };
  };

  const getApplicantName = (feedback) => {
    return (
      feedback.examInfo?.applicantName ||
      feedback.taskSubmissionInfo?.applicantName ||
      feedback.interviewInfo?.applicantName ||
      "Unknown"
    );
  };

  const toggleRowExpansion = (feedbackId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(feedbackId)) {
      newExpanded.delete(feedbackId);
    } else {
      newExpanded.add(feedbackId);
    }
    setExpandedRows(newExpanded);
  };

  const renderDetailedFeedbacks = (detailedFeedbacks, type, url) => {
    if (!detailedFeedbacks || detailedFeedbacks.length === 0) return null;
    console.log(url, "url kkkkkk ////////////////////////////////");
    return (
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center font-mono text-lg">
          <BarChart3 className="mr-2 text-blue-600" size={20} />
          Detailed Breakdown
        </h4>
        {type == "Task" && (
          <div className="my-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center cursor-pointer gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Task Submission
            </a>
          </div>
        )}
        <div className="grid gap-4">
          {detailedFeedbacks.map((detail, index) => (
            <div
              key={detail.id || index}
              className="bg-white dark:bg-gray-800  cursor-pointer rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {detail.criterionName || `Criteria ${index + 1}`}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold border ${getScoreStyle(
                    detail.score
                  )}`}
                >
                  {detail.score}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {detail.comments}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRow = (fb) => {
    const feedbackType = getFeedbackType(fb);
    const IconComponent = feedbackType.icon;
    const isExpanded = expandedRows.has(fb.id);
    const hasDetailedFeedback =
      fb.detailedFeedbacks && fb.detailedFeedbacks.length > 0;
    const isLongComment = fb.comments && fb.comments.length > 4;
    const truncatedComment = isLongComment
      ? fb.comments.substring(0, 10) + "..."
      : fb.comments;

    const handleCommentClick = () => {
      if (isLongComment) {
        setModalContent({
          title: `Comments for ${getApplicantName(fb)}`,
          content: fb.comments,
          isOpen: true,
          id: fb.id,
          totalScore: fb.totalScore,
        });
      }
    };
console.log(feedback,'feedback feedback')
    return (
      <React.Fragment key={fb.id}>
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50  cursor-pointer transition-all duration-200">
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getApplicantName(fb)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {getApplicantName(fb)}
                </div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4 text-center text-sm">
            <div
              className={`inline-flex items-center justify-center   space-x-2 px-3 py-2 rounded-full text-xs font-semibold border-1
            ${
              feedbackType.color === "blue"
                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                : feedbackType.color === "purple"
                ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                : feedbackType.color === "green"
                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
            }`}
            >
              <IconComponent size={14} />
              <span>{feedbackType.type}</span>
            </div>
          </td>

          <td className="px-6 py-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold border-1 ${getScoreStyle(
                  fb.totalScore
                )}`}
              >
                {fb.totalScore}/100
              </span>
            </div>
          </td>

          <td className="px-6 py-4 max-w-xs">
            <div
              className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${
                isLongComment
                  ? "cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  : ""
              }`}
              onClick={handleCommentClick}
              title={isLongComment ? "Click to view full comment" : fb.comments}
            >
              <p className="line-clamp-2">{truncatedComment}</p>

              <span className="text-xs text-blue-500 hover:text-blue-700 font-medium">
                Read more
              </span>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleRowExpansion(fb.id)}
                className="p-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isExpanded ? "Collapse" : "View Details"}
              >
                {isExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
          </td>
        </tr>

        {isExpanded && hasDetailedFeedback && (
          <tr className="bg-gray-50 dark:bg-gray-800/30">
            <td colSpan={6} className="px-6 py-2">
              {renderDetailedFeedbacks(
                fb.detailedFeedbacks,
                feedbackType.type,
                fb?.taskSubmissionInfo?.submissionUrl
              )}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };
  if (isLoading) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Manage Feedback</Title>
        </div>
        <div className="h-[50vh] flex items-center w-full ">
          <div className="flex-1">
            <Loading text={"Fetching Feedback..."} />
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Manage Feedback</Title>
        </div>
        <div className="h-[50vh]  flex items-center justify-center ">
          <Error />
        </div>
      </>
    );
  }

  return (
    <>
      {modalContent && (
        <CommentModal
          modalContent={modalContent}
          setModalContent={setModalContent}
        />
      )}
      <div className="p-3 md:p-6 min-h-screen   text-gray-800 dark:text-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Title>Manage Feedback</Title>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white cursor-pointer hover:translate-y-[-10px] transition duration-300 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Feedback
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {statistics.totalFeedback}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BarChart3
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white cursor-pointer hover:translate-y-[-10px] transition duration-300 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between ">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {statistics.averageScore}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 hover:translate-y-[-10px] transition duration-300 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp
                    className="text-green-600 dark:text-green-400"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white cursor-pointer hover:translate-y-[-10px] transition duration-300 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Excellent (90+)
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {statistics?.scoreRanges?.excellent}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <Star
                    className="text-emerald-600 dark:text-emerald-400"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white cursor-pointer hover:translate-y-[-10px] transition duration-300 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Recent (7 days)
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {statistics.recentFeedback}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Calendar
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-mono">
                Score Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    90-100
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (statistics?.scoreRanges?.excellent /
                              statistics?.totalFeedback) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {statistics?.scoreRanges?.excellent}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    80-89
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 ">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (statistics?.scoreRanges?.good /
                              statistics?.totalFeedback) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {statistics?.scoreRanges?.good}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    70-79
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (statistics?.scoreRanges?.satisfactory /
                              statistics?.totalFeedback) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {statistics?.scoreRanges?.satisfactory}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    70
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (statistics?.scoreRanges?.needsImprovement /
                              statistics?.totalFeedback) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {statistics?.scoreRanges?.needsImprovement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-mono">
                Feedback Types
              </h3>
              <div className="space-y-4">
                {Object?.entries(statistics.typeStats).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {type === "Exam" && (
                        <HelpCircle className="text-blue-600" size={16} />
                      )}
                      {type === "Task" && (
                        <FileText className="text-purple-600" size={16} />
                      )}
                      {type === "Interview" && (
                        <Video className="text-green-600" size={16} />
                      )}
                      {type === "General" && (
                        <MessageCircle className="text-gray-600" size={16} />
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {type}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-mono">
                All Feedback
              </h3>
            </div>
            <Table
              cols={columns}
              data={feedback.data}
              row={renderRow}
              headerColor="bg-gray-50 dark:bg-gray-800"
              headerTextColor="text-gray-700 dark:text-gray-300 font-semibold"
            />
          </div>
        </div>
      </div>
    </>
  );
}
