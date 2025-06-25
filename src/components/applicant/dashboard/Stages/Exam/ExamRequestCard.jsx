import React from "react";
import {  MdAccessTime, MdAssignment } from "react-icons/md";
import Card from "../../general/Card";
import useGetExamRequestInfo from "@/hooks/applicant/Exam/useGetExamRequestInfo";
import Error from "@/components/admin/shared/Error";

function ExamRequestCard({ requestId }) {
  const { data, isLoading, isError, error } = useGetExamRequestInfo(requestId);

  if (isError)
    return (
      <Error
        message={error.message || "Failed to load exam request information."}
      />
    );
  if (!data) return <Error message="No exam request data available." />;
  console.log("Exam Request Data:", data);
  return (
    <div className="flex flex-wrap gap-4 justify-around p-6 py-10">
      {data?.scheduledDate && (
        <Card
          loading={isLoading}
          Icon={MdAccessTime}
          title="Scheduled Time"
          descriptions={
            data?.scheduledDate
              ? new Date(data.scheduledDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          }
          className="border border-gray-100"
        />
      )}

      {data?.scheduledDate && (
        <Card
          loading={isLoading}
          Icon={MdAccessTime}
          title="Scheduled Date"
          descriptions={
            data?.scheduledDate
              ? new Date(data.scheduledDate).toLocaleDateString()
              : ""
          }
          className="border border-gray-100"
        />
      )}

      {data?.instructions && (
        <Card
          loading={isLoading}
          Icon={MdAssignment}
          title="Instructions"
          descriptions={data?.instructions || ""}
          className="border border-gray-100"
        />
      )}
    </div>
  );
}

export default ExamRequestCard;
