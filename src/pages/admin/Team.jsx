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
    <tr className="border text-md border-[var(--table-border)] text-sm hover:bg-[var(--sidebar-icon-bg)]" key={member.id}>
      <td className="p-3">
        <div className="flex gap-1 items-center">
          <div className="h-8 w-8 flex items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)]">
            {member.name.split(" ")[0].slice(0, 1).toUpperCase()}
          </div>
          <div className="ml-3 flex flex-col">
            <div className="font-medium text-[var(--text-color)]">{member.name}</div>
            <div className="font-medium text-[var(--text-color)] text-[12px]">
              {member.email}
            </div>
          </div>
        </div>
      </td>
      <td className="p-3">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
            member.role === "Senior Examiner"
              ? "bg-[var(--button-bg)] text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {member.role}
        </span>
      </td>
      <td className="p-3">
        <div
          className={`flex items-center w-fit gap-1 px-3 font-medium py-1 text-xs rounded-full ${
            member.status === "Active"
              ? "bg-[var(--status-active-bg)] text-[var(--status-active-text)]"
              : "bg-[var(--status-inactive-bg)] text-[var(--status-inactive-text)]"
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
            <h2 className="text-2xl font-bold text-[var(--text-color)]">Team Members</h2>
            <p className="text-[var(--text-color)] mt-1">
              Manage your team and their account permissions here
            </p>
          </div>

          <div className="mt-2 sm:mt-0 bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] font-medium px-3 py-1 rounded-full text-sm">
            12 Total Members
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <Search search={search} setSearch={setSearch} />
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center cursor-pointer justify-center px-3 py-2 text-[var(--text-color)] bg-[var(--sidebar-icon-bg)] hover:bg-[var(--button-hover)] rounded-lg border border-[var(--input-border)] transition-colors font-medium">
            <FaFilter className="mr-2 text-[var(--text-color)]" />
            <span>Filters</span>
          </button>
          <Add text="Add Employee" icon={<FaPlus className="mr-2" />} table="teams" />
        </div>
      </div>

      <Table data={teamMember} cols={cols} row={renderRow} />
    </>
  );
}