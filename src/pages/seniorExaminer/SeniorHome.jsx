import ExaminerInfoModal from "../../components/allExaminer/ExaminerInfoModal";
import useGetTaskCreation from "../../hooks/examiner/task/useGetTaskCreation";
import useGetCreationAssignment from "../../hooks/seniorExaminer/createAssignment/useGetCreationAssignment";

import Welcome from "@/components/admin/shared/Welcome";
export default function SeniorHome() {
  // const { data: taskCreation, error } = useGetTaskCreation(1);
  // console.log(taskCreation?.data,'lllllllllllllllll')
  // const { data } = useGetCreationAssignment();
  // console.log(data, "GetCreationAssignment");
  return <div>
    <div className="flex flex-col gap-5">
          <Welcome />
        </div>
  </div>;
}
