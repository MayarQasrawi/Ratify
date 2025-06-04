import React from 'react';
import { MdHelpOutline, MdAccessTime, MdBarChart } from 'react-icons/md';
import Card from "../../general/Card";
import useGetExamInfo from '@/hooks/applicant/Exam/useGetExamInfo.js';
import Error from '@/components/admin/shared/Error';

function ExamCard({ stageId }) {
  const { data, isLoading, isError, error } = useGetExamInfo(stageId);
  console.log("ExamCard Data:", data);

   if (isError) return <Error message={error.message || "Failed to load exam request information."} />;
  if (!data) return <Error message="No exam request data available." />;

  return (
    <div className="flex flex-wrap gap-4 justify-around p-6 py-10">
      <Card 
        loading={isLoading}
        Icon={MdHelpOutline} 
        title="Question Types" 
        descriptions={data?.data?.questionsType?.join('\n') || ''} 
        className="border border-gray-100"
      />

      <Card 
        loading={isLoading}
        Icon={MdAccessTime} 
        title="Duration" 
        descriptions={data?.data ? `${data.data.durationMinutes} minutes` : ''} 
        className="border border-gray-100"
      />
      <Card 
        loading={isLoading}
        Icon={MdBarChart} 
        title="Exam Difficulty" 
        descriptions={data?.data ? `${data.data.difficulty}` : ''} 
        className="border border-gray-100"
      />
    </div>
  );
}


export default ExamCard;
