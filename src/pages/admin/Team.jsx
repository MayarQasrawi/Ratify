import { useState,useEffect } from "react";
import Table from "../../components/admin/shared/Table";
import Search from "../../components/admin/shared/Search";
import Add from "../../components/admin/shared/Add";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineFindInPage } from "react-icons/md";
import ItemsPerPageSelector from "../../components/admin/shared/ItemsPerPageSelector";
import Pagination from "../../components/admin/shared/Pagination";
import { Link } from "react-router-dom";
import Loading from "../../components/admin/shared/Loading";
import Error from "../../components/admin/shared/Error";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import useGetExaminers from "../../hooks/Admin/useGetExaminers";
import { FaUserClock } from "react-icons/fa6";
import IconActionButton from "../../components/Button/IconActionButton";
import { FaUser, FaUserTie, FaUserShield } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";

import ViewExaminerWorkLoad from "../../components/admin/Team/ViewExaminerWorkLoad";
const teamMember = [
  {
    id: 1,
    fullName: "Mayar Ali",
    email: "mayar.ali@gmail.com",
    userType: "Examiner",
    status: "Active",
    specialization: "Computer Science",
    dateOfBirth: "1990-05-15",
    gendar: "Female",
    examinerLoads: [
      { id: '1', type: 'Exam', maxWorkLoad: 10, currWorkLoad: 4 },
      { id: '2', type: 'Interview', maxWorkLoad: 5, currWorkLoad: 2 },
      { id: '3', type: 'Task', maxWorkLoad: 8, currWorkLoad: 3 },
    ],
  },
  {
    id: 2,
    fullName: "Abrar Ahmad",
    email: "abrar.ahmad@gmail.com",
    userType: "Senior Examiner",
    status: "Active",
    specialization: "Mathematics",
    dateOfBirth: "1985-08-20",
    gendar: "Female",
    examinerLoads: [
      { id: '4', type: 'Exam', maxWorkLoad: 12, currWorkLoad: 12 },
      { id: '5', type: 'Interview', maxWorkLoad: 6, currWorkLoad: 4 },
      { id: '6', type: 'Task', maxWorkLoad: 10, currWorkLoad: 5 },
    ],
  },
  {
    id: 3,
    fullName: "Abed Mahmoud",
    email: "abed.mahmoud@gmail.com",
    userType: "Senior Examiner",
    status: "Inactive",
    specialization: "Physics",
    dateOfBirth: "1988-03-10",
    gendar: "Male",
    examinerLoads: [
      { id: '7', type: 'Exam', maxWorkLoad: 8, currWorkLoad: 0 },
      { id: '8', type: 'Interview', maxWorkLoad: 4, currWorkLoad: 0 },
      { id: '9', type: 'Task', maxWorkLoad: 6, currWorkLoad: 0 },
    ],
  },
  {
    id: 4,
    fullName: "Ali Mohammad",
    email: "ali.mohammad@gmail.com",
    userType: "Manager",
    status: "Inactive",
    specialization: "Business Administration",
    dateOfBirth: "1992-11-25",
    gendar: "Male",
    examinerLoads: [
      { id: '10', type: 'Exam', maxWorkLoad: 15, currWorkLoad: 5 },
      { id: '11', type: 'Interview', maxWorkLoad: 7, currWorkLoad: 3 },
      { id: '12', type: 'Task', maxWorkLoad: 10, currWorkLoad: 4 },
    ],
  },
  {
    id: 5,
    fullName: "Ahmad Azza",
    email: "ahmad.azza@gmail.com",
    userType: "Coordinator",
    status: "Inactive",
    specialization: "Engineering",
    dateOfBirth: "1995-07-30",
    gendar: "Male",
    examinerLoads: [
      { id: '13', type: 'Exam', maxWorkLoad: 9, currWorkLoad: 2 },
      { id: '14', type: 'Interview', maxWorkLoad: 5, currWorkLoad: 1 },
      { id: '15', type: 'Task', maxWorkLoad: 7, currWorkLoad: 3 },
    ],
  },
  {
    id: 6,
    fullName: "Mayar Abed",
    email: "mayar.abed@gmail.com",
    userType: "Coordinator",
    status: "Inactive",
    specialization: "Engineering",
    dateOfBirth: "1995-07-30",
    gendar: "Female",
    examinerLoads: [
      { id: '16', type: 'Exam', maxWorkLoad: 10, currWorkLoad: 5 },
      { id: '17', type: 'Interview', maxWorkLoad: 6, currWorkLoad: 2 },
      { id: '18', type: 'Task', maxWorkLoad: 8, currWorkLoad: 4 },
    ],
  },
  {
    id: 7,
    fullName: "Abrar Ali",
    email: "abrar.ali@gmail.com",
    userType: "Coordinator",
    status: "Inactive",
    specialization: "Engineering",
    dateOfBirth: "1995-07-30",
    gendar: "Female",
    examinerLoads: [
      { id: '19', type: 'Exam', maxWorkLoad: 8, currWorkLoad: 3 },
      { id: '20', type: 'Interview', maxWorkLoad: 4, currWorkLoad: 1 },
      { id: '21', type: 'Task', maxWorkLoad: 6, currWorkLoad: 2 },
    ],
  },
  {
    id: 8,
    fullName: "Mohammad Mahmoud",
    email: "mohammad.mahmoud@gmail.com",
    userType: "Coordinator",
    status: "Inactive",
    specialization: "Engineering",
    dateOfBirth: "1995-07-30",
    gendar: "Male",
    examinerLoads: [
      { id: '22', type: 'Exam', maxWorkLoad: 11, currWorkLoad: 6 },
      { id: '23', type: 'Interview', maxWorkLoad: 5, currWorkLoad: 2 },
      { id: '24', type: 'Task', maxWorkLoad: 9, currWorkLoad: 4 },
    ],
  },
];

  export default function Teams() {
    const [search, setSearch] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [roleFilter, setRoleFilter] = useState(null); // null indicates no filter applied

    const filteredMembers = teamMember.filter(member =>
      member.fullName.toLowerCase().includes(search.toLowerCase()) &&(
        roleFilter === null || member.userType === roleFilter
      )
    );

    const { data, isLoading, isError, error } = useGetExaminers({page: currentPage, itemsPerPage});

    useEffect(() => {
      if (data) {
      setTeamMembers(data.data.data);
      setTotalPages(data.data.totalPages);
      console.log(data.data.totalPages);
      console.log(data.data.data);
      }
    }, [data]);

    const [workLoad, setWorkLoad] = useState([]);
    const handelWorkLoad = (examinerLoads) => {
      setWorkLoad(examinerLoads);
      setWorkLoadModal(true);
      


    }
    const [workLoadModal, setWorkLoadModal] = useState(false);
   
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
        <td className="py-3 px-1 lg:px-3 text-center" >
         

         <IconActionButton
         
            Icon= {IoSearch}
            label="Details" 
            onClick={() => {handelWorkLoad(member)}}
            color="green"
         />
        </td>
    
        {/* Action */}
        <td className="py-3 px-1 lg:px-3 text-center">
        <Link
  className="text-[var(--text-color)] p-1 rounded-md relative group overflow-hidden"
  to={`/dashboard/admin/ViewDetailes/${member.id}`}
  state={{member,page: currentPage}}
  onMouseOver={() => setHoveredMemberId(member.id)}
  onMouseLeave={() => setHoveredMemberId(null)}
      >
  {hoveredMemberId === member.id ? (
    <RiEyeCloseLine className="inline transition-opacity  duration-400" size={16} />
  ) : (
    <RiEyeFill className="inline" size={16} />
  )}
</Link>
        </td>
      </tr>
      
    );



    const col = ["Info", "specialization","Role", "Date Of Birth", "Gender", "Examiner Loads", ""];
    const [hoveredMemberId, setHoveredMemberId] = useState(null);
  
    const roleOptions = [
      { label: 'All', value: null, icon: null },
      { label: 'Examiner', value: 'Examiner', icon: MdOutlineFindInPage },
      { label: 'Senior Examiner', value: 'Senior Examiner', icon: MdOutlineFindInPage },
    ];
    
  return (
    <section className="pr-3" >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
         
          <div >
            <h2 className="lg:text-3xl mb-2 text-xl font-bold text-[var(--main-color)] ">
              Team Members
            </h2>
          </div>

        </div>
      </div>
      <div className=" flex-wrap  md:flex items-center justify-between  p-1 lg:p-3 my-1 ">
        <Search search={search} setSearch={setSearch} />
        <div className=" flex md:gap-3 gap-1 w-full md:w-auto">
          {/* <button className="flex items-center cursor-pointer justify-center lg:px-3 lg:py-2 px-2 py-1 text-[var(--text-color)]  hover:text-[var(--button-hover)] transition-colors font-medium">
            <MdOutlineFindInPage className="mr-1  inline" />
            Filters
          </button> */}
         


          <Add
            text="Add Employee"
            icon={<IoMdAddCircleOutline className="mr-1 " size={16} />}
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
      // Icon={Icon}
      label={label}
      onClick={() => setRoleFilter(value)}
      color={roleFilter === value ? 'purple' : 'gray'}
      ariaLabel={`Filter by ${label}`}
    />
  ))}
</div>

      
      {/* {isLoading? (<Loading text={"Assembling Your Team..."}/>): isError?(<Error message={error.message || "Failed to fetch team members"} /> )
      :(<><Table data={filteredMembers} cols={col} row={renderRow} />
        <Pagination  totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/></>) } */}
     

      <Table data={filteredMembers} cols={col} row={renderRow} />
      <Pagination  totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

      {workLoadModal&& <ViewExaminerWorkLoad isOpen={workLoadModal} setOpen={setWorkLoadModal} state={workLoad} />} 

    </section>
  );
  
}
