import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "@/components/admin/shared/Title";
import Back from "@/components/shared/dashboard/Back";
import { FiAlertCircle } from "react-icons/fi";
import useEvaluateWork from "@/hooks/examiner/evaluationRequest/useEvaluateWork";
import Spinner from "@/components/shared/Spinner";
import GeneralSpinner from "@/components/shared/dashboard/Spinner";
import Alert from "@/components/shared/Alert";
import useFetchCriteria from "@/hooks/seniorExaminer/manageTask/useFetchCriteria";
import { useAuthContext } from "@/contexts/AuthProvider";
import Extract from "@/utils/Extract";
import useGetStageById from "@/hooks/examiner/evaluationRequest/useGetStageById";

export default function EvaluationWork() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const id = Extract(auth, "nameid");
  console.log(id, 'examiner id')
  console.log(location, "EvaluationWork");
  
  const {
    data: stageCriteria = [],
    isLoading: isCriteriaLoading,
    isError: isCriteriaError,
  } = useFetchCriteria(location.state.stageId);
  
  const { data: stageInfo } = useGetStageById(location.state.stageId)
  console.log(stageCriteria, 'stageCriteria')
  console.log(stageInfo, 'stageInfo')
  
  const {
    mutate,
    isPending,
    isSuccess,
    error: evaluateError,
  } = useEvaluateWork();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      generalFeedback: "",
      details: {},
      resultStatus: "", 
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (stageCriteria?.data?.length) {
      const initDetails = stageCriteria?.data?.filter(stg => stg.isActive == true).reduce((acc, c) => {
        acc[c.id] = { score: "", comments: "" };
        return acc;
      }, {});
      reset({ 
        generalFeedback: "", 
        details: initDetails,
        resultStatus: " "
      });
    }
  }, [stageCriteria, reset]);

  useEffect(() => {
    if (isSuccess)
      setTimeout(() => navigate('/dashboard/examiner/pending-evaluations'), 1500)
  }, [isSuccess])

  const details = watch("details");
  const watchedResultStatus = watch("resultStatus");
  const calculateTotalScore = () =>
    stageCriteria?.data?.filter(stg => stg.isActive == true).reduce((sum, c) => sum + (+details[c.id]?.score || 0), 0);

  const getAutoResultStatus = () => {
    const pct = calculateTotalScore();
    console.log(pct >= stageInfo?.data?.passingScore,'getAutoResultStatus getAutoResultStatus')  
    if (pct >= stageInfo?.data.passingScore && location.state.type !== 'Task') {
      return "Passed";
    } else if (pct < stageInfo?.data.passingScore && location.state.type !== 'Task') {
      return "Failed";
    } 
    else if (pct >= stageInfo?.data.passingScore && location.state.type === 'Task') {
      return "Passed";
    }
    else if (pct < stageInfo?.data.passingScore && location.state.type === 'Task') {
      return null; 
    }
  };

  useEffect(() => {
    const autoStatus = getAutoResultStatus();
    if (autoStatus) {
      setValue("resultStatus", autoStatus);
    }
  }, [details, stageInfo?.data.passingScore]);

  const isTaskBelowThreshold = () => {
    console.log(location.state.type === 'Task' && 
           calculateTotalScore() < stageInfo?.data.passingScore,'jjjjjjjjj,,jjjjjjjjjjjjjjjjjjjjjjjj')
    return location.state.type === 'Task' && 
           calculateTotalScore() < stageInfo?.data.passingScore;
  };

  const onSubmit = (data) => {
    console.log(data,'data.resultStatus ...,m,/////////////')
    const payload = {
      stageProgressId: location.state.stageProgressId,
      examinerId: id,
      taskSubmissionId: location.state.taskSubmissionId || null,
      interviewBookId: location.state.interviewRequestId || null,
      examRequestId: location.state.examRequestId || null,
      comments: data.generalFeedback,
      totalScore: calculateTotalScore(),
      resultStatus:location.state.type!='Task' ? getAutoResultStatus():isTaskBelowThreshold() ? data.resultStatus:'Passed', 
      detailedFeedbacks: stageCriteria.data.filter(stg => stg.isActive == true).map((c) => ({
        evaluationCriteriaId: c.id,
        score: +data.details[c.id].score,
        comments: data.details[c.id].comments,
      })),
    };
    console.log(payload,'payload')
    mutate(payload);
  };

  if (isCriteriaLoading) return <GeneralSpinner text="Loading criteria…" />;

  return (
    <>
      {isSuccess && <Alert message="Evaluation Done" />}
      {evaluateError && <Alert type='error' message={evaluateError.message} />}
      <section className="min-h-screen px-4  ">
        <div className="max-w-5xl ">
          <Back
            text="Back To Pending Evaluation"
            onClick={() => navigate("/dashboard/Examiner/pending-evaluations")}
          />

          <header className="my-6">
            <Title>Evaluate {location.state.applicantName} {location.state.type}</Title>
            {location.state.type === 'Task' && location.state.submissionUrl && (
              <div className="mt-3">
                <a 
                  href={location.state.submissionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Task Submission 
                </a>
              </div>
            )}
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Evaluation Criteria
                </h2>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Passing Score: {stageInfo?.data.passingScore}
                  </span>
                  <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    calculateTotalScore() >= stageInfo?.data.passingScore 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                  }`}>
                    Current: {calculateTotalScore()}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {stageCriteria.data.filter(stg => stg.isActive == true).map((c) => (
                  <div key={c.id} className="p-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {c.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {c.description}
                      </p>
                      <span className="inline-block mt-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Max: {c.weight}
                      </span>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Score <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          {...register(`details.${c.id}.score`, {
                            required: "Score is required",
                            min: { value: 0, message: "Min is 0" },
                            max: {
                              value: c.weight,
                              message: `Max is ${c.weight}`,
                            },
                          })}
                          className={`w-full px-3 py-2 border rounded-lg placeholder:text-sm dark:bg-gray-700 dark:border-gray-600 `}
                          placeholder="0"
                        />
                        {errors.details?.[c.id]?.score && (
                          <div className="flex items-center gap-1 text-red-500 mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            <p className="text-red-500 text-xs">
                              {errors.details[c.id].score.message}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Comments <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          {...register(`details.${c.id}.comments`, {
                            required: "Comments are required",
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-100 rounded-lg placeholder:text-sm"
                          placeholder={`Your feedback on ${c.name.toLowerCase()}...`}
                        />
                        {errors.details?.[c.id]?.comments && (
                          <div className="flex items-center gap-1 text-red-500 mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            <p className="text-red-500 text-xs">
                              {errors.details[c.id].comments.message}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                General Feedback
              </h2>
              <textarea
                {...register("generalFeedback", {
                  required: "General feedback is required",
                })}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-100 placeholder:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.generalFeedback ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Provide your overall assessment and any additional comments..."
              />
              {errors.generalFeedback && (
                <p className="text-red-500 text-xs mt-1">
                  <FiAlertCircle className="w-4 h-4 inline" />{" "}
                  {errors.generalFeedback.message}
                </p>
              )}
            </div>

            {isTaskBelowThreshold() && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Evaluation Decision 
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  The current score <span className="text-red-500">({calculateTotalScore()})</span> is below the passing threshold ({stageInfo?.data.passingScore}). 
                 
                </p>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      value="ResubmissionAllowed"
                      {...register("resultStatus")}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Allow Resubmission </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        The applicant should be given another chance to improve their work.
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      value="Failed"
                      {...register("resultStatus")}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Failed </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        The applicant did not meet the requirements and cannot proceed.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
            <div className="text-center">
              <button
                disabled={isPending}
                type="submit"
                className="inline-flex cursor-pointer disabled:cursor-not-allowed items-center gap-2 disabled:opacity-50 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                {isPending ? <Spinner /> : <CheckCircle className="w-5 h-5" />}{" "}
                Submit Evaluation
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
