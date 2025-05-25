import React from "react";
import useFetchExaminerById from "../../../hooks/examiner/useFetchExaminerById";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";
import useGetTrackStructure from "../../../hooks/seniorExaminer/plan/useGetTrackStructer";
import PlanStructure from "./definePlan/PlanStructure";
import TrackStructureDetails from "./TrackStructureDetails";
import Spinner from "../../../components/shared/dashboard/Spinner";

export default function Plan() {
  const { auth } = useAuthContext();
  let role;
  let id;
  let isExaminer = false;
  if (auth) {
    id = Extract(auth, "nameid");
    role = Extract(auth, "role");
    isExaminer = role === "Examiner" || role === "SeniorExaminer";
  }
  const { data: examinerInfo } = useFetchExaminerById(id, isExaminer);
  console.log(examinerInfo);
  const {
    data: trackStructure,
    isLoading,
    isError,
  } = useGetTrackStructure(examinerInfo?.data?.workingTracks[0].id);
  if (isLoading) return <Spinner text="Plan Page" />;
  if (trackStructure?.data?.levels?.length == 0) return <PlanStructure />;
  else return <TrackStructureDetails structure={trackStructure?.data} />;
}
