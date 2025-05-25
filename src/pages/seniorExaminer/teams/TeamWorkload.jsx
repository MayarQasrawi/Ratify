import { useState } from "react";
import Search from "../../../components/admin/shared/Search";
import Title from "../../../components/admin/shared/Title";
import Table from "../../../components/admin/shared/Table";
import { FaFileAlt, FaTasks, FaUserTie, FaEdit } from "react-icons/fa";
import { FiPlusCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from 'react-icons/ai';
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
const cols = ["Info", "Specialization", "Examiner Loads"];
export const examiners = [
  {
    id: 1,
    fullName: "Ahmad Nassar",
    email: "ahmad@example.com",
    specialization: "Frontend Development",
    examinerLoads: [
      //   { type: "exam", maxWorkLoad: 5, currWorkLoad: 2 },
      //   { type: "interview", maxWorkLoad: 3, currWorkLoad: 1 },
      //   { type: "task", maxWorkLoad: 4, currWorkLoad: 2 },
    ],
  },
  {
    id: 2,
    fullName: "Layla Haddad",
    email: "layla@example.com",
    specialization: "Backend Development",
    examinerLoads: [
      { type: "exam", maxWorkLoad: 6, currWorkLoad: 3, id: 6 },
      { type: "interview", maxWorkLoad: 2, currWorkLoad: 1, id: 7 },
      { type: "task", maxWorkLoad: 5, currWorkLoad: 4, id: 8 },
    ],
  },
  {
    id: 3,
    fullName: "Tariq Suleiman",
    email: "tariq@example.com",
    specialization: "Full Stack",
    examinerLoads: [
      { type: "exam", maxWorkLoad: 4, currWorkLoad: 1, id: 9 },
      { type: "interview", maxWorkLoad: 4, currWorkLoad: 4 },
      { type: "task", maxWorkLoad: 3, currWorkLoad: 0 },
    ],
  },
];

export default function TeamWorkload() {
    const { auth } = useAuthContext();
    let role;
    let id;
    let isExaminer = false;

   if (auth) {
    id = Extract(auth, "nameid");
    role = Extract(auth, "role");
       isExaminer = (role === "Examiner" || role === "SeniorExaminer");

  }
   const { data: examinerInfo} = useFetchExaminerById(
    id,isExaminer
  );
  console.log(examinerInfo.data.workingTracks[0].id,'inside manage workload',examinerInfo.data)
  const { data: teams, isError,isLoading } = useFetchExaminersByTrack(examinerInfo.data.workingTracks[0].id);
  const {
      mutate: deleteWorkload,
      isPending,
      isSuccess,
      error,
      isError:isDeleteWorkloadError,
      reset,
    } = useDeleteWorkload();
    console.log(teams?.data,'teams')
  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedWorkLoad, setSelectedWorkLoad] = useState(null);
  const [expandedMemberId, setExpandedMemberId] = useState(null);

  let teamFilter = teams?.data && teams?.data.filter(exp=>exp.id!=examinerInfo.data.id);
  // let isLoading=false;
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
          <Title>My Team</Title>
        </div>
          <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
            <Search search={search} setSearch={setSearch} />
          </div>
          <NoResultFound text='member' />
        </>
      );}
  const renderRow = (member) => (
    <tr
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
      key={member.id}
      id={member.id}
    >
      <td className="py-3 px-1 lg:px-3">
        <div className="flex gap-1 items-center justify-start ml-[4%] md:ml-[10%]">
          <div className="h-8 w-8 items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] lg:flex hidden">
            {member.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
          </div>
          <div className="ml-3 flex flex-col">
            <div className="font-medium text-[var(--text-color)]">
              {member.fullName}
            </div>
            <div className="font-medium text-[var(--text-color)] text-[12px] hidden md:block">
              {member.email}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-1 lg:px-3 text-center">
        {member.specialization || "N/A"}
      </td>
      <td className="p-4 text-center align-top">
        <div className="flex flex-col gap-2 items-center">
          {member.examinerLoads.length === 0 ? (
            <button
              onClick={() => {
                setSelectedAction("add");
                setSelectedMember(member);
              }}
              className="flex items-center gap-1 cursor-pointer  px-4 py-2 bg-gray-100 dark:bg-[var(--table-header-bg)]  dark:text-white hover:bg-gray-200 rounded-lg text-black transition-colors"
            >
              <FiPlusCircle /> Add Workload
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              {member.examinerLoads.length > 0 && (
                <div className="flex justify-end  w-full relative ">
                  <button
                    onClick={() => {
                      setExpandedMemberId((prev) =>
                        prev === member.id ? null : member.id
                      );
                    }}
                    className="text-gray-700 absolute rigt-0 -top-2 hover:text-blue-500 cursor-pointer outline-none transition-colors"
                  >
                    {expandedMemberId === member.id ? (
                      <span title="Hide All">
                        <FiChevronUp size={18} />
                      </span>
                    ) : (
                      <span title="Show All">
                        <FiChevronDown size={18} />
                      </span>
                    )}
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-2 w-full">
                {member.examinerLoads
                  .slice(
                    0,
                    expandedMemberId === member.id
                      ? member.examinerLoads.length
                      : 1
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        {item.type === "task" ? (
                          <FaTasks size={14} />
                        ) : item.type === "interview" ? (
                          <FaUserTie />
                        ) : (
                          <FaFileAlt size={14} />
                        )}
                        <span className="font-medium capitalize text-gray-700 dark:text-gray-300">
                          {item.type}
                        </span>
                      </div>
                      <span
                        className={`ml-2 ${
                          item.currWorkLoad === item.maxWorkLoad
                            ? "text-red-600 dark:text-red-400 font-semibold"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {item.currWorkLoad}/{item.maxWorkLoad}
                      </span>
                      <div className="flex items-center gap-1">
                         <span
                        onClick={() => {
                          setSelectedWorkLoad(item);
                          setSelectedAction("Edit");
                        }}
                        className="cursor-pointer"
                      >
                        <AiOutlineEdit size={16} className="hover:text-blue-500" />
                      </span>
                       <span
                        onClick={() => {
                          setSelectedWorkLoad(item);
                          setSelectedAction("delete");
                          setSelectedMember(member)
                        }}
                        className="cursor-pointer"
                      >
                        <AiOutlineDelete size={16}  className="hover:text-red-500" />
                      </span>
                      </div>
                     
                    </div>
                  ))}
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
            Are you sure you want to delete  {selectedMember.fullName} <span className="underline capitalize">{selectedWorkLoad.type}</span> Wokload ?
          </ConfirmationModal>
        </Modal>
      )}
      <section className="pr-3">
        <div className="mt-8 pl-4 mb-6">
          <Title>Workload Management</Title>
        </div>
        <div className="pl-4 mt-3 gap-y-3 justify-start flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
            <Search search={search} setSearch={setSearch} />
          </div>
        </div>
        <div className="pl-4 mt-1.5 pt-4 pb-6 min-w-[500px]">
          <Table data={teamFilter} cols={cols} row={renderRow} />
        </div>
      </section>
    </>
  );
}
