import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../components/shared/modal/Modal";
import Action from "../../../components/admin/shared/Action";
import Table from "../../../components/admin/shared/Table";
import Search from "../../../components/admin/shared/Search";
import img from "../../../assets/img/tracks/frontEnd.png";
import { FaSadTear } from "react-icons/fa";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import useGetAllTraks from "../../../hooks/admin/tracks/useGetAllTracks";
import Loading from "../../../components/admin/shared/Loading";
import Error from "../../../components/admin/shared/Error";
import useDeleteTrack from "../../../hooks/Admin/tracks/useDeleteTrack";
import Card from "../../../components/admin/track/Card";
import Title from "../../../components/admin/shared/Title";
import {
  IoMdAddCircleOutline,
  IoMdStats,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import NoResultFound from "../../../components/shared/NoResultFound";
import useActivateTrack from "../../../hooks/Admin/tracks/useActivateTrack";
import AssignMangerModal from "../../../components/admin/track/AssignMangerModal";
import useDeleteManager from "../../../hooks/Admin/tracks/useDeleteManager";
import StatCard from "@/components/admin/track/StatisticalCard";

const cols = ["Track", "Status", " "];

export default function Track() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [selected, setSelected] = useState(null);
  const [track, setTrack] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  const {
    data: trackd,
    isLoading: isTrackArrive,
    isError: isTrackError,
  } = useGetAllTraks();

  const {
    mutate: deleteTrack,
    isPending,
    isSuccess,
    error,
    isError,
    reset,
    data: deleteRequestData,
  } = useDeleteTrack();

  const {
    mutate: deleteTrackManger,
    isPending: isTrackManagerPending,
    isSuccess: isTrackManagerSuccess,
    isError: isTrackManagerError,
    reset: resetTrackManager,
  } = useDeleteManager();

  const {
    mutate: toggleTrack,
    isPending: isTogglePending,
    isSuccess: isToggleTrackSuccess,
    error: isToggleTrackError,
    reset: resetToggleTrack,
    data: toggleTrackData,
  } = useActivateTrack();

  let trackFilter = trackd?.data;

  if (search) {
    trackFilter = trackFilter?.filter((track) =>
      track.name.toUpperCase().includes(search.toUpperCase())
    );
  }

  if (statusFilter !== "All") {
    trackFilter = trackFilter?.filter((track) => {
      switch (statusFilter) {
        case "Active":
          return track.isActive === true;
        case "Inactive":
          return track.isActive === false;
        default:
          return true;
      }
    });
  }

  const totalTracks = trackd?.data?.length || 0;
  const activeTracks =
    trackd?.data?.filter((track) => track.isActive)?.length || 0;
  const inactiveTracks = totalTracks - activeTracks;

  const handleEdit = (track) => {
    navigate("/dashboard/Admin/tracks/setup", { state: { track } });
  };

  const handleViewDetails = (track) => {
    navigate("/dashboard/admin/track-details", { state: { track } });
  };

  const handleDelete = (track) => {
    setSelected("delete");
    setTrack(track);
  };

  const handleToggle = (track) => {
    setSelected("toggle");
    setTrack(track);
  };

  const handleAssignManger = (track, isMangerAssign) => {
    if (isMangerAssign) {
      setSelected("assign-manger");
    } else {
      setSelected("edit-manger");
    }
    setTrack(track);
  };

  const handleDeleteManager = (track) => {
    setSelected("delete-manager");
    setTrack(track);
  };

  if (isTrackArrive) {
    return (
      <div className="min-h-screen w-full  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Title>Our Tracks</Title>
          </div>
          <div>
            <div className="mt-5 w-full">
              <Loading text={"Fetching Tracks..."} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isTrackError) {
    return (
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Title>Our Tracks</Title>
          </div>
          <div className="flex items-center justify-center min-h-[400px]">
            <Error />
          </div>
        </div>
      </div>
    );
  }

  if (trackFilter?.length == 0 && isTrackArrive == false) {
    return (
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Title>Our Tracks</Title>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Tracks"
              count={totalTracks}
              icon={IoMdStats}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-white dark:bg-gray-800"
            />
            <StatCard
              title="Active Tracks"
              count={activeTracks}
              icon={IoMdCheckmarkCircle}
              color="text-green-600 dark:text-green-400"
              bgColor="bg-white dark:bg-gray-800"
            />
            <StatCard
              title="Inactive Tracks"
              count={inactiveTracks}
              icon={IoMdCloseCircle}
              color="text-red-600 dark:text-red-400"
              bgColor="bg-white dark:bg-gray-800"
            />
          </div>
            <div className="flex flex-wrap gap-2 mt-4 mb-3">
                {["All", "Active", "Inactive"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-2 text-sm cursor-pointer font-medium rounded-lg transition-colors ${
                      statusFilter === filter
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
                </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <Search search={search} setSearch={setSearch} />
              </div>
            </div>
            <NoResultFound text="track" />
          </div>
        </div>
      </div>
    );
  }

  const renderRow = (track) => {
    const isMangerAssign = track.seniorExaminerID;
    const hasSenior = Boolean(track.seniorExaminerID);

    const actions = [
      ...(track.isActive
        ? [
            {
              name: "Edit Track",
              onClick: () => handleEdit(track),
            },
            {
              name: "Delete Track",
              onClick: () => handleDelete(track),
            },
            {
              name: hasSenior ? "Edit Manager" : "Add Manager",
              onClick: () => handleAssignManger(track, hasSenior),
            },
          ]
        : [
            {
              name: "Toggle Track",
              onClick: () => handleToggle(track),
            },
            ...(hasSenior
              ? [
                  {
                    name: "Delete Manager",
                    onClick: () => handleDeleteManager(track),
                  },
                ]
              : []),
          ]),
      {
        name: "View Details",
        onClick: () => handleViewDetails(track),
      },
    ];

    return (
      <tr className="border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <td className="p-4 ">
          <div className="flex items-center justify-center  space-x-4">
            <div >
              <img
                className="w-12 h-12 object-cover rounded-lg shadow-sm"
                src={`${import.meta.env.VITE_API}${track.image}`}
                alt={track.name}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {track.name}
              </h3>
            </div>
          </div>
        </td>
        <td className="p-4 text-center ">
          <span
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${
              track.isActive
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                track.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {track.isActive ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="p-4 text-center ">
          <div className="flex justify-center">
            <Action actions={actions} />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      {selected == "delete" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
              setSelected(null);
              setTrack(null);
              reset();
            }}
            Confirm={() => deleteTrack(track.id)}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            data={deleteRequestData}
          >
            Are you sure you want to delete{" "}
            <span className="capitalize"> {track.name}</span> Track?
          </ConfirmationModal>
        </Modal>
      )}
      {selected == "toggle" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
              setSelected(null);
              setTrack(null);
              resetToggleTrack();
            }}
            Confirm={() => toggleTrack(track.id)}
            isPending={isTogglePending}
            isSuccess={isToggleTrackSuccess}
            isError={isToggleTrackError}
            data={toggleTrackData}
          >
            Are you sure you want to Activate{" "}
            <span className="capitalize">{track.name}</span>?
          </ConfirmationModal>
        </Modal>
      )}
      {(selected === "assign-manger" || selected === "edit-manger") && (
        <Modal>
          <AssignMangerModal
            isEdit={selected === "assign-manger"}
            track={track}
            onClose={() => {
              setSelected(null);
              setTrack(null);
            }}
          />
        </Modal>
      )}
      {selected == "delete-manager" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
              setSelected(null);
              setTrack(null);
              resetTrackManager();
            }}
            Confirm={() => deleteTrackManger(track.id)}
            isPending={isTrackManagerPending}
            isSuccess={isTrackManagerSuccess}
            isError={isTrackManagerError}
          >
            Are you sure you want to delete {track.name} Manager?
          </ConfirmationModal>
        </Modal>
      )}

      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Title>Our Tracks</Title>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Tracks"
              count={totalTracks}
              icon={IoMdStats}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-white dark:bg-gray-800"
            />
            <StatCard
              title="Active Tracks"
              count={activeTracks}
              icon={IoMdCheckmarkCircle}
              color="text-green-600 dark:text-green-400"
              bgColor="bg-white dark:bg-gray-800"
            />
            <StatCard
              title="Inactive Tracks"
              count={inactiveTracks}
              icon={IoMdCloseCircle}
              color="text-red-600 dark:text-red-400"
              bgColor="bg-white dark:bg-gray-800"
            />
          </div>

          <div className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <Search search={search} setSearch={setSearch} />
                </div>
                <button
                  onClick={() => navigate("/dashboard/Admin/tracks/setup")}
                  className="inline-flex items-center px-4 py-2 dark:text-white  text-black cursor-pointer hover:text-blue-500 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <IoMdAddCircleOutline className="w-5 h-5 mr-2" />
                  Add Track
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {["All", "Active", "Inactive"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-2 text-sm cursor-pointer font-medium rounded-lg transition-colors ${
                      statusFilter === filter
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex  items-center gap-1 mt-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg w-fit">
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center cursor-pointer px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  <HiOutlineViewList className="w-4 h-4 mr-2" />
                  Table
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`flex items-center cursor-pointer px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === "card"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  <HiOutlineViewGrid className="w-4 h-4 mr-2" />
                  Cards
                </button>
              </div>
            </div>

            <div className="p-6">
              {viewMode === "table" ? (
                <div className="shadow-md">
                  <Table data={trackFilter} cols={cols} row={renderRow} />
                </div>
              ) : (
                <Card
                  data={trackFilter}
                  setSelected={setSelected}
                  setTrack={setTrack}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
