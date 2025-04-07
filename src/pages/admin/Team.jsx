import { useState } from "react";
import Action from "../../components/admin/shared/Action";
import Table from "../../components/admin/shared/Table";
import Search from "../../components/admin/shared/Search";
import Add from "../../components/admin/shared/Add";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineFindInPage } from "react-icons/md";
import { useEffect } from "react";
import axiosInstance from '../../hooks/auth/utils/axiosInstance'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaArrowCircleLeft ,FaArrowCircleRight} from "react-icons/fa";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
     const cols = ["Info", "Role", "Status", " "];
     useEffect(() => {
      const fetchTeamMembers = async () => {
        try {
          const response = await axiosInstance.get("/Users", {
            params: {
              // userType: ['Examiner', 'Senior Examiner', 'Admin'],
              page: currentPage,
              pageSize: itemsPerPage
            }
            ,
            headers: {
             'Accept': 'application/json'
              
            }
          });
           console.log("response",response)
           console.log("ddddddd",response.data.data)
           
          setTeamMembers(response.data.data);
          setTotalPages(response.data.totalPages);
        } catch (err) {
          setError(err.message || "Failed to fetch team members");
        } finally {
          setLoading(false);
        }
      };
  
      fetchTeamMembers();
    }, [currentPage, itemsPerPage]); // Refetch when page or itemsPerPage changes

  //Pagination controls component


  const Pagination = () => (
    <div className="flex items-center justify-center mt-4 gap-4">
      <button
        onClick={() => setCurrentPage(currentPage => Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || !totalPages}
        className="p-2 text-[var(--text-color)] hover:text-[var(--button-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FaArrowCircleLeft className="text-lg" />
      </button>
  
      <span className="text-sm text-[var(--text-color)]">
        Page <span className="font-bold">{currentPage}</span> of {totalPages}
      </span>
  
      <button
        onClick={() => setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || !totalPages}
        className="p-2 text-[var(--text-color)] hover:text-[var(--button-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FaArrowCircleRight className="text-lg" />
      </button>
    </div>
  );

  // Items per page selector
  const ItemsPerPageSelector = () => (
    <div className="flex items-center gap-2">
      <span className="text-[var(--text-color)]">Items per page:</span>
      <select 
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );

  // if (loading) {
  //   return <div className="p-4 text-center">Loading team members...</div>;
  // }

  // if (error) {
  //   return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  // }
    const renderRow = (member) => (
      <tr
        className="text-md border-b last:border-b-0 last:rounded-b-lg  border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
        key={member.id}
      >
        <td className="py-3 px-1 lg:px-3 text-center">
          <div className="flex gap-1 items-center justify-center">
            <div className="h-8 w-8 items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] lg:flex hidden">
              {member.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
            </div>
            <div className="ml-3 flex flex-col md:items-start items-center">
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
      <ItemsPerPageSelector />
      </div>
      

      <Table data={teamMembers} cols={cols} row={renderRow} />
      <Pagination />
    </section>
  );
}
