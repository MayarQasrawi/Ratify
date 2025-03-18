import { useState } from "react";
import Action from "../../components/admin/shared/Action";
import Table from "../../components/admin/shared/Table";
import Search from "../../components/admin/shared/Search";
import { FaFilter, FaPlus } from "react-icons/fa";
import Add from "../../components/admin/shared/Add";
const teamMember = [
  {
    id: 1,
    name: "Abrar",
    email: "abrar@gmail.com",
    role: "Exeminer",
    status: "Active",
  },
  {
    id: 2,
    name: "Abrar",
    email: "abrar@gmail.com",
    role: "Senior Examiner",
    status: "Active",
  },
  {
    id: 3,
    name: "Abrar",
    email: "abrar@gmail.com",
    role: "Senior Examiner",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Abrar",
    email: "abrar@gmail.com",
    role: "Senior Examiner",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Abrar",
    email: "abrar@gmail.com",
    role: "SeniorExeminer",
    status: "Inactive",
  },
];
const cols = ["Info", "Role", "Status"];
const actions = ["Toggle Account", "View Details"];
export default function Teams() {
  const [search, setSearch] = useState("");
  const renderRow = (member) => (
    <tr className=" border text-md border-[#EAECF0] text-sm" key={member.id}>
      <td className="p-3">
        <div className="flex gap-1 items-center">
          <div className="h-8 w-8 flex items-center justify-center font-bold rounded-lg bg-blue-100 text-blue-500 ">
            {member.name.split(" ")[0].slice(0, 1).toUpperCase()}
          </div>
          <div className="ml-3 flex flex-col ">
            <div className="font-medium text-gray-800">{member.name}</div>
            <div className="font-medium text-gray-800 text-[12px]">
              {member.email}
            </div>
          </div>
        </div>
      </td>
      <td className="p-3">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
            member.role === "Senior Examiner"
              ? "bg-red-500 text-white px-3 py-1 rounded-full text-xs"
              : "bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
          }`}
        >
          {member.role}
        </span>
      </td>
      <td className="p-3">
        <div
          className={`flex items-center w-fit gap-1 px-3 font-medium  py-1 text-xs rounded-full ${
            member.status === "Active"
              ? "bg-[#ECFDF3] text-[#037847]"
              : "bg-[#F2F4F7] text-[#364254]"
          }`}
        >
          {member.status === "Active" ? (
            <span className="block w-1.5 h-1.5 rounded-full bg-[#14BA6D]"></span>
          ) : (
            <span className="block w-1.5 h-1.5 rounded-full bg-[#6C778B]"></span>
          )}
          {member.status}
        </div>
      </td>
      <td className="p-3">
        <Action actions={actions} />
      </td>
    </tr>
  );
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
            <p className="text-gray-500 mt-1">
              Manage your team and their account permissions here
            </p>
          </div>

          <div className="mt-2 sm:mt-0 bg-[#E7ECFF] text-blue-700 font-medium px-3 py-1 rounded-full  text-sm">
            12 Total Members
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <Search search={search} setSearch={setSearch} />
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center  cursor-pointer justify-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-colors font-medium">
            <FaFilter className="mr-2 text-gray-600" />
            <span>Filters</span>
          </button>
          <Add text="Add Employee" icon={<FaPlus className="mr-2" />} table='teams'  />
        </div>
      </div>

      <Table data={teamMember} cols={cols} row={renderRow} />
    </>
  );
}
