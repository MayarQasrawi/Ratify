import axiosInstance from "../../hooks/auth/utils/axiosInstance";
import { useState, useEffect } from "react";
import Action from "../../components/admin/shared/Action";
import Table from "../../components/admin/shared/Table";
import Search from "../../components/admin/shared/Search";
import { MdOutlineFindInPage } from "react-icons/md";
import ItemsPerPageSelector from "../../components/admin/shared/ItemsPerPageSelector";
import Pagination from "../../components/admin/shared/Pagination";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/admin/shared/Loading";
import Error from "../../components/admin/shared/Error";
import Title from './shared/Title';

export default function Applicants() {
  const [search, setSearch] = useState("");
  const actions = [
    { name: "view details", onClick: "some logic pass" },
    { name: "approve application", onClick: "some logic pass" },
  ];
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const cols = ["Info", "Status"];

  const fetchApplicants = async ({ queryKey }) => {
    const [_key, { page, pageSize }] = queryKey;

    const response = await axiosInstance.get("/Applicants", {
      params: { page, pageSize },
    });
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["applicants", { page: currentPage, pageSize: itemsPerPage }],
    queryFn: fetchApplicants,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setApplicants(data.data.data);
      setTotalPages(data.data.totalPages);
    }
  }, [data]);

  const renderRow = (applicant) => (
    <tr
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
      key={applicant.id}
    >
      <td className="py-3 px-1 lg:px-3 text-center">
        <div className="flex gap-1 items-center justify-start ml-[4%] md:ml-[10%] ">
          <div className="h-8 w-8 items-center justify-center font-bold rounded-lg bg-[var(--sidebar-icon-bg)] text-[var(--main-color)] lg:flex hidden">
            {applicant.fullName.split(" ")[0].slice(0, 1).toUpperCase()}
          </div>
          <div className="ml-3 flex flex-col">
            <div className="font-medium text-[var(--text-color)]">
              {applicant.fullName}
            </div>
            <div className="font-medium text-[var(--text-color)] text-[12px] hidden md:block">
              {applicant.email}
            </div>
          </div>
        </div>
      </td>
      {/* <td className="py-3 px-1 lg:px-3 text-center table-cell">
        <span className="text-[var(--text-color)]">
          {new Date(applicant.applicationDate).toLocaleDateString()}
        </span>
      </td> */}
      <td className="py-3 px-1 lg:px-3 flex justify-center text-center">
        <div
          className={`flex items-center justify-center w-fit gap-1 p-1 md:px-3 font-medium py-1 text-xs rounded-full ${
            applicant.status === "Approved"
              ? "bg-green-100 dark:bg-green-200 text-green-800"
              : "bg-yellow-100 dark:bg-yellow-200 text-yellow-800"
          }`}
        >
          {applicant.status === "Approved" ? (
            <span className="block w-1.5 h-1.5 rounded-full bg-green-600"></span>
          ) : (
            <span className="block w-1.5 h-1.5 rounded-full bg-yellow-600"></span>
          )}
          <span className=""> {applicant.status}</span>
        </div>
      </td>
      {/* <td className="py-3 px-1 lg:px-3 text-center">
        <Action actions={actions} />
      </td> */}
    </tr>
  );

  return (
    <section className="pr-3">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="mt-8">
            <Title>Applicants</Title>
          </div>
        </div>
      </div>
      <div className="flex-wrap md:flex items-center justify-between p-1 lg:p-3 my-1">
        {/* <Search search={search} setSearch={setSearch} /> */}
        <div className="flex md:gap-3 gap-1 w-full md:w-auto">
          {/* <button className="flex items-center cursor-pointer justify-center lg:px-3 lg:py-2 px-2 py-1 text-[var(--text-color)] hover:text-[var(--button-hover)] transition-colors font-medium">
            <MdOutlineFindInPage className="mr-1 inline" />
            Filters
          </button> */}
        </div>
      </div>
      <div className="mb-3">
        <ItemsPerPageSelector
          options={[5, 10, 20, 50]}
          selectedValue={itemsPerPage}
          onChange={setItemsPerPage}
        />
      </div>

      {isLoading ? (
        <Loading text={"Fetching Applicants..."} />
      ) : isError ? (
        <Error message={error.message || "Failed to fetch applicants"} />
      ) : (
        <>
          <Table data={applicants} cols={cols} row={renderRow} />
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </section>
  );
}

