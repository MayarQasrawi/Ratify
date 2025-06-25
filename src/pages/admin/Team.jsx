import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import MemberCard from "../../components/admin/Team/MemberCard";
import { MdOutlineFindInPage } from "react-icons/md";
import { RiEyeCloseLine, RiEyeFill, RiGroupLine, RiUserStarLine, RiUserLine, RiTeamLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import Add from "../../components/admin/shared/Add";
import Error from "../../components/admin/shared/Error";
import Loading from "../../components/admin/shared/Loading";
import Pagination from "../../components/admin/shared/Pagination";
import Table from "../../components/admin/shared/Table";
import IconActionButton from "../../components/Button/IconActionButton";
import useGetExaminers from "../../hooks/Admin/useGetExaminers";
import EmptyState from "../../components/admin/shared/EmptyState";
import ViewExaminerWorkLoad from "../../components/admin/Team/ViewExaminerWorkLoad";
import HeroHeader from "../../components/admin/Team/HeroHeader";
import Title from "../../components/admin/shared/Title";
import ControlsPanel from "../../components/admin/Team/ControlsPanel";

import SearchInput from "../../components/admin/shared/Search";
import ItemsPerPageSelector from "../../components/admin/shared/ItemsPerPageSelector";

export default function Teams() {
  const [search, setSearch] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [roleFilter, setRoleFilter] = useState(null);
  const [workLoad, setWorkLoad] = useState([]);
  const [workLoadModal, setWorkLoadModal] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
const [activeView, setActiveView] = useState("table"); // or "card"

  const { data, isLoading, isError, error } = useGetExaminers({
    page: currentPage,
    itemsPerPage,
  });

  useEffect(() => {
    if (data) {
      setOriginalData(data.data.data);
      setTotalPages(data.data.totalPages);
      setTotalCount(data.data.totalCount);
    }
  }, [data, currentPage]);

  useEffect(() => {
    if (originalData.length > 0) {
      const filtered = originalData.filter(
        (member) =>
          member.fullName.toLowerCase().includes(search.toLowerCase()) &&
          (roleFilter === null || member.userType === roleFilter)
      );
      setFilteredData(filtered);
    }
  }, [originalData, search, roleFilter]);

  const handelWorkLoad = (member) => {
    setWorkLoad(member);
    setWorkLoadModal(true);
  };

  const BASE_URL = import.meta.env.VITE_BAPI;

  const renderRow = (member) => (
    <tr
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
      key={member.id}
      id={member.id}
    >
      <td className="py-3 px-1 lg:px-3">
        <div className="flex gap-1 items-center justify-start ml-[4%] md:ml-[10%] ">
          {member.image && member.image !== "null" ? (
            <img
              src={`${BASE_URL}../${member.image}`}
              alt="Profile"
              className="h-8 w-8 rounded-lg object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/public/default-profile.jpeg";
              }}
            />
          ) : (
            <div className="h-8 w-8 items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] flex">
              {member.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="ml-3 flex flex-col">
            <div className="font-medium text-[var(--text-color)]">{member.fullName}</div>
            <div className="font-medium text-[var(--text-color)] text-[12px] hidden md:block">
              {member.email}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-1 lg:px-3 text-center">{member.bio || "N/A"}</td>
      <td className="py-3 px-1 lg:px-3 text-center">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
            member.userType !== "SeniorExaminer"
              ? "bg-[var(--main-color)] text-white"
              : "bg-[var(--secondary-color)] text-white "
          }`}
        >
          {member.userType === "SeniorExaminer" ? "Senior Examiner" : "Examiner"}
        </span>
      </td>
      <td className="py-3 px-1 lg:px-3 text-center">
        {new Date(member.dateOfBirth).toLocaleDateString() || "N/A"}
      </td>
      <td className="py-3 px-1 lg:px-3 text-center">{member.gendar || "N/A"}</td>
      <td className="py-3 px-1 lg:px-3 text-center">
        <IconActionButton
          Icon={IoSearch}
          label="Details"
          onClick={() => handelWorkLoad(member)}
          color="purple"
        />
      </td>
      <td className="py-3 px-1 lg:px-3 text-center">
        <Link
          className="text-[var(--text-color)] p-1 rounded-md relative group overflow-hidden"
          to={`/dashboard/admin/ViewDetails/${member.id}`}
          state={{ member, page: currentPage }}
          onMouseOver={() => setHoveredMemberId(member.id)}
          onMouseLeave={() => setHoveredMemberId(null)}
        >
          {hoveredMemberId === member.id ? (
            <RiEyeCloseLine className="inline transition-opacity duration-400" size={16} />
          ) : (
            <RiEyeFill className="inline" size={16} />
          )}
        </Link>
      </td>
    </tr>
  );

  const cols = [
    "Info",
    "Bio",
    "Role",
    "Date Of Birth",
    "Gender",
    "Examiner Loads",
    " ",
  ];

  const roleOptions = [
    { label: "All", value: null },
    { label: "Examiner", value: "Examiner" },
    { label: "Senior Examiner", value: "SeniorExaminer" },
  ];

  const heroStats = [
    { icon: RiGroupLine, value: filteredData.length, label: "Showing Members" },
    { icon: RiTeamLine, value: totalCount, label: "Total Members" },
    { icon: RiUserStarLine, value: originalData.filter(m => m.userType === "SeniorExaminer").length, label: "Senior Examiners" },
    { icon: RiUserLine, value: originalData.filter(m => m.userType === "Examiner").length, label: "Examiners" },
  ];

  return (
    <section className="pr-3">
      <div className="space-y-4 mb-8">
        <HeroHeader
          title="Team Members"
          subtitle="Manage your examination team and their workloads"
          icon={RiGroupLine}
          stats={heroStats}
        />
      </div>

      <ControlsPanel
        title="Team Members"
        subtitle="Filter, search and manage team"
      viewMode={activeView}
  onViewModeChange={setActiveView}
        searchComponent={<SearchInput search={search} setSearch={setSearch} placeholder="Search by name..." />}
        addComponent={
          <Add
            text="Add Employee"
            icon={<IoMdAddCircleOutline className="mr-1" size={16} />}
            table="teams"
          />
        }
        filtersComponent={
          roleOptions.map(({ label, value }) => (
            <IconActionButton
              key={label}
              label={label}
              onClick={() => setRoleFilter(value)}
              color={roleFilter === value ? "purple" : "gray"}
              ariaLabel={`Filter by ${label}`}
            />
          ))
        }
        itemsPerPageComponent={
          <ItemsPerPageSelector
            options={[5, 10, 20, 50]}
            selectedValue={itemsPerPage}
            onChange={setItemsPerPage}
          />
        }
      />

      {isLoading ? (
        <Loading text={"Assembling Your Team..."} />
      ) : isError ? (
        <Error
          message={error.message || "Failed to fetch team members"}
          errorCode={error.errorCode || "Error Code"}
          onRetry={() => window.location.reload()}
        />
      ) : filteredData.length === 0 ? (
  <EmptyState
    search={search}
    setSearch={setSearch}
    roleFilter={roleFilter}
    setRoleFilter={setRoleFilter}
  />
) : (
  <>
    {activeView === "table" ? (
      <>
        <Table
          data={filteredData}
          cols={cols}
          row={renderRow}
          headerColor="bg-gray-600/10"
          headerTextColor="text-gray-500"
        />
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </>
    ) : (
      <div className="flex flex-col ">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {filteredData.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            baseUrl={BASE_URL}
            hoveredMemberId={hoveredMemberId}
            onHover={setHoveredMemberId}
            onWorkloadClick={handelWorkLoad}
            viewDetailsPath={`/dashboard/admin/ViewDetails/${member.id}`}
            currentPage={currentPage}
          />
        ))}
       
      </div>
       <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    )}

 </>
      )}

      {workLoadModal && (
        <ViewExaminerWorkLoad
          isOpen={workLoadModal}
          setOpen={setWorkLoadModal}
          state={workLoad}
        />
      )}
    </section>
  );
}
