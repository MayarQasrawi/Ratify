import { useState } from "react";
import Title from "../../../components/admin/shared/Title";
import Table from "../../../components/admin/shared/Table";
import {
  FaFileAlt,
  FaTasks,
  FaUserTie,
  FaExclamationTriangle,
  FaClipboardList,
  FaPercentage,
} from "react-icons/fa";
import {
  FiPlusCircle,
  FiChevronDown,
  FiChevronUp,
  FiActivity,
  FiCheckCircle,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import {  BsPeople } from "react-icons/bs";
import Modal from "../../../components/shared/modal/Modal";
import AddWorkload from "../../../components/seniorExaminer/workload/AddWorkload";
import Header from "../../../components/seniorExaminer/workload/shared/Header";
import EditWorkload from "../../../components/seniorExaminer/workload/EditWorkload";
import useFetchExaminersByTrack from "../../../hooks/seniorExaminer/workloads/useFetchExaminerByTrack";
import Loading from "../../../components/admin/shared/Loading";
import Error from "../../../components/admin/shared/Error";
import NoResultFound from "../../../components/shared/NoResultFound";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import useDeleteWorkload from "../../../hooks/seniorExaminer/workloads/useDeleteWorkload";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";
import useFetchExaminerById from "../../../hooks/examiner/useFetchExaminerById";

const cols = ["Info", "Examiner Loads"];

const getWorkloadTypeIcon = (type, size = 14) => {
  switch (type.toLowerCase()) {
    case "exam":
      return <FaFileAlt size={size} className="text-blue-600" title="Exam" />;
    case "task":
      return <FaTasks size={size} className="text-green-600" title="Task" />;
    case "interview":
      return (
        <FaUserTie size={size} className="text-purple-600" title="Interview" />
      );
    default:
      return (
        <FaClipboardList size={size} className="text-gray-600" title="Other" />
      );
  }
};


export default function TeamWorkload() {
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
  console.log(
    examinerInfo.data.workingTracks[0].id,
    "inside manage workload",
    examinerInfo.data
  );
  const {
    data: teams,
    isError,
    isLoading,
  } = useFetchExaminersByTrack(examinerInfo.data.workingTracks[0].id);
  const {
    mutate: deleteWorkload,
    isPending,
    isSuccess,
    error,
    isError: isDeleteWorkloadError,
    reset,
  } = useDeleteWorkload();
  console.log(teams?.data, "teams");
  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedWorkLoad, setSelectedWorkLoad] = useState(null);
  const [expandedMemberId, setExpandedMemberId] = useState(null);

  let teamFilter =
    teams?.data && teams?.data.filter((exp) => exp.id != examinerInfo.data.id);

const calculateStats = () => {
  if (!teamFilter)
    return {
      totalMembers: 0,
      totalWorkloads: 0,
      overloadedMembers: 0,
      avgUtilization: 0,
      workloadByType: {},
      underutilizedMembers: 0,
      perfectUtilizationMembers: 0,
      membersWithoutWorkload: 0,
    };

  const totalMembers = teamFilter.length;
  let totalWorkloads = 0;
  let overloadedMembers = 0;
  let underutilizedMembers = 0;
  let perfectUtilizationMembers = 0;
  let membersWithoutWorkload = 0;
  let totalMaxCapacity = 0;
  let totalCurrentLoad = 0;
  const workloadByType = { exam: 0, interview: 0, task: 0 };

  teamFilter.forEach((member) => {
    const memberWorkloads = member.examinerLoads || [];
    
    if (memberWorkloads.length === 0) {
      membersWithoutWorkload++;
      return;
    }
    let memberMaxCapacity = 0;
    let memberCurrentLoad = 0;
    let hasOverloadedWorkload = false; 
    memberWorkloads.forEach((workload) => {
      totalWorkloads++;
      memberMaxCapacity += workload.maxWorkLoad;
      memberCurrentLoad += workload.currWorkLoad;
      totalMaxCapacity += workload.maxWorkLoad;
      totalCurrentLoad += workload.currWorkLoad;
      workloadByType[workload.type] =
        (workloadByType[workload.type] || 0) + workload.currWorkLoad;
      if (workload.maxWorkLoad > 0) {
        const workloadUtilization = (workload.currWorkLoad / workload.maxWorkLoad) * 100;
        if (workloadUtilization >= 100) { 
          hasOverloadedWorkload = true;
        }
      }
    });
    if (memberMaxCapacity > 0) {
      const memberUtilization = (memberCurrentLoad / memberMaxCapacity) * 100;
      if (memberUtilization >= 90 || hasOverloadedWorkload) {
        overloadedMembers++;
      } else if (memberUtilization >= 70) {
        perfectUtilizationMembers++;
      } else {
        underutilizedMembers++;
      }
    }
  });

  const avgUtilization =
    totalMaxCapacity > 0
      ? Math.round((totalCurrentLoad / totalMaxCapacity) * 100)
      : 0;

  return {
    totalMembers,
    totalWorkloads,
    overloadedMembers,
    underutilizedMembers,
    perfectUtilizationMembers,
    membersWithoutWorkload,
    avgUtilization,
    workloadByType,
    totalCurrentLoad,
    totalMaxCapacity,
  };
};

  const stats = calculateStats();

  if (isLoading) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Workload Management</Title>
        </div>
        <div className="h-[50vh] flex items-center w-full ">
          <div className="flex-1">
            <Loading text={"Fetching Your Team..."} />
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Workload Management</Title>
        </div>
        <div className="h-[50vh]  flex items-center justify-center ">
          <Error />
        </div>
      </>
    );
  }
  if (search)
    teamFilter = teams.data.filter((team) =>
      team.fullName.toUpperCase().includes(search.toUpperCase())
    );
  if (teamFilter.length == 0 && isLoading == false) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Workload Management</Title>
        </div>
        <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
          <EnhancedSearch search={search} setSearch={setSearch} />
        </div>
        <NoResultFound text="member" />
      </>
    );
  }

  const StatCard = ({
    icon,
    title,
    value,
    color,
    subtitle,
    bgColor,
    trend,
  }) => (
    <div className="bg-white cursor-pointer dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
      <div className="flex items-center justify-between ">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {trend && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  trend.type === "up"
                    ? "bg-green-100 text-green-700"
                    : trend.type === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${bgColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const renderRow = (member) => (
    <tr
     className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
      key={member.id}
      id={member.id}
    >
      <td className="px-6 py-4 ">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {member.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
            </div>
            {member.examinerLoads &&
              member.examinerLoads.some(
                (load) => load.currWorkLoad >= load.maxWorkLoad * 0.9
              ) && (
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"
                  title="High workload"
                ></div>
              )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {member.fullName}
              </p>
              {member.examinerLoads && member.examinerLoads.length === 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  No Workload
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
              {member.email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4  flex justify-center ">
        <div className="space-y-3 flex justify-center w-[70%] ">
          {member.examinerLoads.length === 0 ? (
                <button
              onClick={() => {
                setSelectedAction("add");
                setSelectedMember(member);
              }}
              className="flex items-center text-center gap-1 cursor-pointer  px-4 py-2 bg-gray-100 dark:bg-[var(--table-header-bg)]  dark:text-white hover:bg-gray-200 rounded-lg text-black transition-colors"
            >
              <FiPlusCircle /> Add Workload
            </button>
          ) : (
            <div className="space-y-3  w-full">
              {member.examinerLoads.length > 1 && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setExpandedMemberId((prev) =>
                        prev === member.id ? null : member.id
                      );
                    }}
                    className="inline-flex cursor-pointer items-center text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {expandedMemberId === member.id ? (
                      <>
                        <FiChevronUp className="mr-1" size={16} />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FiChevronDown className="mr-1" size={16} />
                        Show All ({member.examinerLoads.length})
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="space-y-2 w-full ">
                {member.examinerLoads
                  .slice(
                    0,
                    expandedMemberId === member.id
                      ? member.examinerLoads.length
                      : 2
                  )
                  .map((item, index) => {
                    const utilizationPercent = Math.round(
                      (item.currWorkLoad / item.maxWorkLoad) * 100
                    );
                    const isHighLoad = utilizationPercent >= 90;
                    return (
                      <div
                        key={index}
                        className={`group/workload flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                          isHighLoad
                            ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                            : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {getWorkloadTypeIcon(item.type, 16)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
                                {item.type}
                              </span>
                              {isHighLoad && (
                                <FaExclamationTriangle
                                  size={12}
                                  className="text-red-500 animate-pulse"
                                  title="High workload"
                                />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {item.currWorkLoad}/{item.maxWorkLoad}
                              </span>
                              <div className="w-36 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-300 ${
                                    isHighLoad
                                      ? "bg-red-500"
                                      : utilizationPercent >= 70
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                                ></div>
                              </div>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  isHighLoad
                                    ? "bg-red-100 text-red-700"
                                    : utilizationPercent >= 70
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {utilizationPercent}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover/workload:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => {
                              setSelectedWorkLoad(item);
                              setSelectedAction("Edit");
                            }}
                            className="p-1.5 text-gray-400 cursor-pointer hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                          >
                            <AiOutlineEdit size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedWorkLoad(item);
                              setSelectedAction("delete");
                              setSelectedMember(member);
                            }}
                            className="p-1.5 text-gray-400 cursor-pointer hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                          >
                            <AiOutlineDelete size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {selectedAction === "add" && (
        <Modal>
          <AddWorkload
            onClose={() => {
              setSelectedAction(null);
              setSelectedMember(null);
            }}
            member={selectedMember}
          />
        </Modal>
      )}
      {selectedAction === "Edit" && (
        <Modal>
          <EditWorkload
            workload={selectedWorkLoad}
            onClose={() => {
              setSelectedAction(null);
              setSelectedWorkLoad(null);
            }}
          />
        </Modal>
      )}
      {selectedAction == "delete" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
              setSelectedAction(null);
              setSelectedWorkLoad(null);
              setSelectedMember(null);
              reset();
            }}
            Confirm={() => deleteWorkload(selectedWorkLoad.id)}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isDeleteWorkloadError}
          >
            Are you sure you want to delete {selectedMember.fullName}{" "}
            <span className="underline capitalize">
              {selectedWorkLoad.type}
            </span>{" "}
            Wokload ?
          </ConfirmationModal>
        </Modal>
      )}
      <section className="pr-3">
        <div className="mt-8 pl-4 mb-6">
          <Title>Workload Management</Title>
        </div>
        <div className="pl-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <StatCard
              icon={
                <BsPeople
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              }
              title="Team Members"
              value={stats.totalMembers}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-100 dark:bg-blue-900/20"
              subtitle="Active examiners in your team"
            />

            <StatCard
              icon={
                <FaPercentage
                  size={24}
                  className={
                    stats.avgUtilization >= 90
                      ? "text-red-600 dark:text-red-400"
                      : stats.avgUtilization >= 70
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-green-600 dark:text-green-400"
                  }
                />
              }
              title="Average Utilization"
              value={`${stats.avgUtilization}%`}
              color={
                stats.avgUtilization >= 90
                  ? "text-red-600 dark:text-red-400"
                  : stats.avgUtilization >= 70
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-green-600 dark:text-green-400"
              }
              bgColor={
                stats.avgUtilization >= 90
                  ? "bg-red-100 dark:bg-red-900/20"
                  : stats.avgUtilization >= 70
                  ? "bg-yellow-100 dark:bg-yellow-900/20"
                  : "bg-green-100 dark:bg-green-900/20"
              }
              subtitle={`${stats.totalCurrentLoad}/${stats.totalMaxCapacity} total capacity`}
            />

            <StatCard
              icon={
                <FiAlertTriangle
                  size={24}
                  className="text-red-600 dark:text-red-400"
                />
              }
              title="High Load "
              value={stats.overloadedMembers}
              color="text-red-600 dark:text-red-400"
              bgColor="bg-red-100 dark:bg-red-900/20"
              subtitle="Members at ≥90% capacity"
            />
            <StatCard
              icon={
                <FiActivity
                  size={24}
                  className="text-orange-600 dark:text-orange-400"
                />
              }
              title="Unassigned"
              value={stats.membersWithoutWorkload}
              color="text-orange-600 dark:text-orange-400"
              bgColor="bg-orange-100 dark:bg-orange-900/20"
              subtitle="Members with no current workload"
            />
          </div>
        </div>
       
        <div className="rounded-lg  min-w-[500px] shadow">
          <Table data={teamFilter} cols={cols} row={renderRow}  headerColor="bg-gray-400/10"
           />
        </div>
      </section>
    </>
  );
}
