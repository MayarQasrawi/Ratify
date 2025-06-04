// In Teams.jsx
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineFindInPage } from "react-icons/md";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Add from "../../components/admin/shared/Add";
import Error from "../../components/admin/shared/Error";
import ItemsPerPageSelector from "../../components/admin/shared/ItemsPerPageSelector";
import Loading from "../../components/admin/shared/Loading";
import Pagination from "../../components/admin/shared/Pagination";
import Search from "../../components/admin/shared/Search";
import Table from "../../components/admin/shared/Table";
import IconActionButton from "../../components/Button/IconActionButton";
import useGetExaminers from "../../hooks/Admin/useGetExaminers";
import EmptyState from "../../components/admin/shared/EmptyState";
import ViewExaminerWorkLoad from "../../components/admin/Team/ViewExaminerWorkLoad";

import { set } from "react-hook-form";
import Title from "../../components/admin/shared/Title";

export default function Teams() {
  const [search, setSearch] = useState("");
  const [originalData, setOriginalData] = useState([]); // Store the unfiltered data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState(null);
  const [workLoad, setWorkLoad] = useState([]);
  const [workLoadModal, setWorkLoadModal] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);

  // Fetch data from API
  const { data, isLoading, isError, error } = useGetExaminers({
    page: currentPage, 
    itemsPerPage
  });

  // Store original data when API response is received
  useEffect(() => {
    if (data) {
      setOriginalData(data.data.data);
      setTotalPages(data.data.totalPages);
    }
  }, [data]);

  // Apply filters when search, roleFilter or original data changes
  useEffect(() => {
    if (originalData.length > 0) {
      const filtered = originalData.filter(member => 
        member.fullName.toLowerCase().includes(search.toLowerCase()) &&
        (roleFilter === null || member.userType === roleFilter)
      );
      setFilteredData(filtered);
    }
  }, [originalData, search, roleFilter]);

  const handelWorkLoad = (member) => {
    console.log("Member data:", member);
    console.log("Examiner loads:", member.examinerLoads);
    setWorkLoad(member );
    setWorkLoadModal(true);
  };
  // Example data
 const MOCK_EXAMINERS = [
  {
    id: "1",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    specialization: "Mathematics",
    userType: "Examiner",
    dateOfBirth: "1990-05-20",
    gendar: "Female",
    image: "",
    examinerLoads: [{ subject: "Algebra", students: 25 }],
  },
  {
    id: "2",
    fullName: "Bob Smith",
    email: "bob@example.com",
    specialization: "Physics",
    userType: "Senior Examiner",
    dateOfBirth: "1985-09-15",
    gendar: "Male",
    image: "",
    examinerLoads: [{ subject: "Quantum Physics", students: 15 }],
  },
  {
    id: "3",
    fullName: "Charlie Lee",
    email: "charlie@example.com",
    specialization: "Chemistry",
    userType: "Examiner",
    dateOfBirth: "1992-11-10",
    gendar: "Male",
    image: "",
    examinerLoads: [{ subject: "Organic Chemistry", students: 20 }],
  },
];


  const renderRow = (member) => (
    <tr
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
      key={member.id}
      id={member.id}
    >
      {/* Name & Email */}
      <td className="py-3 px-1 lg:px-3">
        <div className="flex gap-1 items-center justify-start ml-[4%] md:ml-[10%]">
          {member.image ? (
            <img 
              src={member.image} 
              alt="Profile" 
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <div className="h-8 w-8 items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] lg:flex hidden">
              {member.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
            </div>
          )}
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
  
      {/* Specialization */}
      <td className="py-3 px-1 lg:px-3 text-center">
        {member.specialization || 'N/A'}
      </td>
     
      {/* User Type */}
      <td className="py-3 px-1 lg:px-3 text-center">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
            member.userType === "Senior Examiner" 
              ? "bg-[var(--button-bg)] text-white" 
              : "bg-green-600 text-white"
          }`}
        >
          {member.userType}
        </span>
      </td>
  
      {/* Date of Birth */}
      <td className="py-3 px-1 lg:px-3 text-center">
        {new Date(member.dateOfBirth).toLocaleDateString() || 'N/A'}
      </td>
  
      {/* Gender */}
      <td className="py-3 px-1 lg:px-3 text-center">
        {member.gendar || 'N/A'}
      </td>
  
      {/* Examiner Loads */}
      <td className="py-3 px-1 lg:px-3 text-center">
        <IconActionButton
          Icon={IoSearch}
          label="Details" 
          onClick={() => handelWorkLoad(member)}
          color="green"
        />
      </td>
      {/* Action */}
      <td className="py-3 px-1 lg:px-3 text-center">
        <Link
          className="text-[var(--text-color)] p-1 rounded-md relative group overflow-hidden"
          to={`/dashboard/admin/ViewDetailes/${member.id}`}
          state={{member, page: currentPage}}
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
  

  const col = ["Info", "specialization", "Role", "Date Of Birth", "Gender", "Examiner Loads", ""];

  const roleOptions = [
    { label: 'All', value: null, icon: null },
    { label: 'Examiner', value: 'Examiner', icon: MdOutlineFindInPage },
    { label: 'Senior Examiner', value: 'Senior Examiner', icon: MdOutlineFindInPage },
  ];
  
  return (
    <section className="pr-3">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="mt-8">
            <Title>
              Team Members
            </Title>
          </div>
        </div>
      </div>
      <div className="flex-wrap md:flex items-center justify-between p-1 lg:p-3 my-1">
        <Search search={search} setSearch={setSearch} />
        <div className="flex md:gap-3 gap-1 w-full md:w-auto">
          <Add
            text="Add Employee"
            icon={<IoMdAddCircleOutline className="mr-1" size={16} />}
            table="teams"
          />
        </div>
      </div>

      <div className="mb-3">
        <ItemsPerPageSelector 
          options={[5, 10, 20, 50]} 
          selectedValue={itemsPerPage} 
          onChange={setItemsPerPage} 
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-4 mt-7">
        {roleOptions.map(({ label, value, icon: Icon }) => (
          <IconActionButton
            key={label}
            label={label}
            onClick={() => setRoleFilter(value)}
            color={roleFilter === value ? 'purple' : 'gray'}
            ariaLabel={`Filter by ${label}`}
          />
        ))}
      </div>
    {/* {  isLoading ? (
        <Loading text={"Assembling Your Team..."} />
      ) : isError ? (
        <Error message={error.message || "Failed to fetch team members"} errorCode={error.errorCode||"error code"} onRetry={()=>{}}/>
      ) : filteredData.length === 0 ? (
        <EmptyState search={search} setSearch={setSearch} roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
      ) : (
        <>
          <Table data={MOCK_EXAMINERS} cols={col} row={renderRow} />
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </>
      )} */}
          <Table data={MOCK_EXAMINERS} cols={col} row={renderRow} />
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />

      {workLoadModal && 
        <ViewExaminerWorkLoad 
          isOpen={workLoadModal} 
          setOpen={setWorkLoadModal} 
          state={workLoad} 
        />
      }
    </section>
  );
}