import { useState } from "react";
import Action from "../../components/admin/shared/Action";
import Table from "../../components/admin/shared/Table";
import Search from "../../components/admin/shared/Search";
import Add from "../../components/admin/shared/Add";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineFindInPage } from "react-icons/md";
import { useEffect } from "react";
import axiosInstance from '../../hooks/auth/utils/axiosInstance'
import ItemsPerPageSelector from "../../components/admin/shared/ItemsPerPageSelector";
import Pagination from "../../components/admin/shared/Pagination";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../components/admin/shared/Loading";
import Error from "../../components/admin/shared/Error";

  const teamMember = [
    {
      id: 1,
      fullName: "Abrar Smith",
      email: "abrar@gmail.com",
      userType: "Examiner",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Jane Doe",
      email: "jane@gmail.com",
      userType: "Senior Examiner",
      status: "Active",
    },
    {
      id: 3,
      fullName: "John Smith",
      email: "john@gmail.com",
      userType: "Senior Examiner",
      status: "Inactive",
    },
    {
      id: 4,
      fullName: "Alice Johnson",
      email: "alice@gmail.com",
      userType: "Administrator",
      status: "Inactive",
    },
    {
      id: 5,
      fullName: "Bob Wilson",
      email: "bob@gmail.com",
      userType: "Coordinator",
      status: "Inactive",
    },
  ];


  
  export default function Teams() {
    const [search, setSearch] = useState("");
    const actions = [
      { name: "toggle account", onClick: "some logic pass" },
      { name: "view details", onClick: "some logic pass" },
    ];
    const [teamMembers, setTeamMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
     const cols = ["Info", "Role", "Status", " "];
    
     const fetchTeamMembers = async ({ queryKey }) => {
      // Destructure from queryKey array
      const [_key, { page, pageSize }] = queryKey;
      
      const response = await axiosInstance.get("/Examiners", {
        params: { page, pageSize }
      });
      return response.data;
    };

    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["teamMembers", { page: currentPage, pageSize: itemsPerPage }],
      queryFn: fetchTeamMembers,
      keepPreviousData: true,
    });

    useEffect(() => {
      if (data) {
      setTeamMembers(data.data.data);
      setTotalPages(data.totalPages);
      }
    }, [data]);

  
    const renderRow = (member) => (
      <tr
        className="text-md border-b last:border-b-0 last:rounded-b-lg  border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
        key={member.id}
      >
        <td className="py-3 px-1 lg:px-3 text-center">
          <div className="flex gap-1 items-center justify-start ml-[4%] md:ml-[10%] ">
            <div className="h-8 w-8 items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] lg:flex hidden">
              {member.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
            </div>
            <div className="ml-3 flex flex-col  ">
              <div className="font-medium text-[var(--text-color)]">
                {member.fullName}
              </div>
              <div className="font-medium text-[var(--text-color)] text-[12px] hidden md:block">
                {member.email}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-1 lg:px-3 text-center table-cell">
          <span
            className={`inline-flex px-1 lg:px-2 py-1 text-xs text-center rounded-full font-medium ${
              member.userType === "Senior Examiner"
                ? "bg-[var(--button-bg)] text-white "
                : "bg-green-600 text-white"
            }`}
          >
            <span className="lg:inline hidden">{member.userType}</span>
            <span className="lg:hidden inline">
              {member.userType.split(" ")[0]}
            </span>
          </span>
        </td>
        <td className="py-3 px-1 lg:px-3 flex justify-center text-center">
          <div
            className={`flex items-center justify-center w-fit gap-1 p-1 md:px-3 font-medium py-1 text-xs rounded-full ${
              member.status === "Active"
                ? "bg-green-100 dark:bg-green-200 text-green-800"
                : "bg-red-100 dark:bg-red-200 text-red-800"
            }`}
          >
            {member.status === "Active" ? (
              <span className="block w-1.5 h-1.5 rounded-full bg-green-600"></span>
            ) : (
              <span className="block w-1.5 h-1.5 rounded-full bg-red-600"></span>
            )}
            <span className=""> {member.status}</span>
          </div>
        </td>
        <td className="py-3 px-1 lg:px-3 text-center">
          <Action actions={actions} />
        </td>
      </tr>
    );

  return (
    <section className="pr-3">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
         
          <div >
            <h2 className="lg:text-3xl mb-2 text-xl font-bold text-[var(--main-color)] ">
              Team Members
            </h2>
            {/* <p className="text-[var(--text-color)]  mt-1">
              Manage your team and their account permissions here
            </p> */}
          </div>
{/* 
          <div className="mt-2 sm:mt-0 bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] font-medium px-3 py-1 rounded-full text-sm text-center">
            12 members
          </div> */}
        </div>
      </div>
      <div className=" flex-wrap  md:flex items-center justify-between  p-1 lg:p-3 my-1 ">
        <Search search={search} setSearch={setSearch} />
        <div className=" flex md:gap-3 gap-1 w-full md:w-auto">
          <button className="flex items-center cursor-pointer justify-center lg:px-3 lg:py-2 px-2 py-1 text-[var(--text-color)]  hover:text-[var(--button-hover)] transition-colors font-medium">
            <MdOutlineFindInPage className="mr-1  inline" />
            Filters
          </button>
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
      
      {isLoading? (<Loading text={"Assembling Your Team..."}/>): isError?(<Error message={error.message || "Failed to fetch team members"} /> )
      :(<><Table data={teamMember} cols={cols} row={renderRow} />
        <Pagination  totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/></>) }
     
      {/* <Table data={teamMembers} cols={cols} row={renderRow} />
      <Pagination  totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/> */}
    </section>
  );
}
