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
import { IoMdAddCircleOutline } from "react-icons/io";
import NoResultFound from "../../../components/shared/NoResultFound";
import useActivateTrack from "../../../hooks/Admin/tracks/useActivateTrack";
import AssignMangerModal from "../../../components/admin/track/AssignMangerModal";
import useDeleteManager from "../../../hooks/Admin/tracks/useDeleteManager";

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

  console.log(trackd?.data, "from api endhbbjjjjjjj");

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

  const handleEdit = (track) => {
    console.log("Edit action clicked");
    console.log(track);
    navigate("/dashboard/Admin/tracks/setup", { state: { track } });
  };

  const handleViewDetails = (track) => {
    console.log("View Details action clicked");
    navigate("/dashboard/admin/track-details", { state: { track } });
  };

  const handleDelete = (track) => {
    setSelected("delete");
    setTrack(track);
  };

  const handleToggle = (track) => {
    console.log(track);
    setSelected("toggle");
    setTrack(track);
  };

  const handleAssignManger = (track, isMangerAssign) => {
    console.log("assign manger ///////////////////////////////", track.id);
    console.log(isMangerAssign);
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
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Our Tracks</Title>
        </div>
        <div className="h-[50vh] flex items-center w-full ">
          <div className="flex-1">
            <Loading text={"Fetching Tracks..."} />
          </div>
        </div>
      </>
    );
  }

  if (isTrackError) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Our Tracks</Title>
        </div>
        <div className="h-[50vh]  flex items-center justify-center ">
          <Error />
        </div>
      </>
    );
  }

  if (trackFilter?.length == 0 && isTrackArrive == false) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Our Tracks</Title>
        </div>
        <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
          <Search search={search} setSearch={setSearch} />
        </div>
        <NoResultFound text="track" />
      </>
    );
  }

  const renderRow = (track) => {
    const isMangerAssign = track.seniorExaminerID;
    console.log(isMangerAssign, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
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
      <tr className="border border-[var(--table-border)] text-sm text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-3 text-[var(--text-color)] text-center ">
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2 max-w-[200px]">
              <img
                className="w-15 h-15 object-cover rounded-md"
                src={`${import.meta.env.VITE_API}${track.image}`}
                alt={track.name}
              />
              <h2 className="font-semibold">{track.name}</h2>
            </div>
          </div>
        </td>
        <td className="py-3 px-1 lg:px-3  text-center">
          <div className=" flex justify-center ">
            <div
              className={`flex items-center  justify-center w-fit gap-1 p-1 md:px-3 font-medium py-1 text-xs rounded-full ${
                track.isActive
                  ? "sm:bg-green-100 dark:sm:bg-green-200 text-green-800"
                  : "sm:bg-red-100 dark:sm:bg-red-200 text-red-800"
              }`}
            >
              {track.isActive === true ? (
                <span className="block w-1.5 h-1.5 rounded-full bg-green-600"></span>
              ) : (
                <span className="block w-1.5 h-1.5 rounded-full bg-red-600"></span>
              )}
              <span className="">
                {" "}
                {track.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </td>
        <td className="p-3">
          <Action actions={actions} />
        </td>
      </tr>
    );
  };

  console.log(`selected track ${track}`, track, selected, "llllllllllllllll");
  console.log(toggleTrackData, "toggleTrackData responce ");

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
      <section className="pr-3">
        <div className="mt-4 pl-4 mb-6">
          <Title>Our Tracks</Title>
        </div>
        <div className="pl-4 mt-3 gap-y-3 justify-start flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
            <Search search={search} setSearch={setSearch} />
          </div>
          <button
            onClick={() => navigate("/dashboard/Admin/tracks/setup")}
            className="cursor-pointer flex items-center px-3.5 py-2 text-sm hover:text-[var(--main-color)] transition"
          >
            <IoMdAddCircleOutline className="mr-1" size={16} /> Add Track
          </button>
        </div>
        <div className="pl-4 mb-4 mt-2">
          <div className="flex gap-2">
            {["All", "Active", "Inactive"].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 text-sm cursor-pointer font-medium rounded-full transition-colors ${
                  statusFilter === filter
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="pl-4 mt-2.5 text-sm">
          <div className="flex gap-6">
            <button
              onClick={() => setViewMode("table")}
              className={`cursor-pointer pb-2 ${
                viewMode === "table"
                  ? "border-b-2 border-blue-600 text-gray-900 dark:text-white font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`cursor-pointer pb-2 ${
                viewMode === "card"
                  ? "border-b-2 border-blue-600 text-gray-900 dark:text-white font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        {viewMode == "table" ? (
          <div>
            <div className="pl-4 mt-1.5 pt-4 pb-6 min-w-[500px]">
              <Table data={trackFilter} cols={cols} row={renderRow} />
            </div>
          </div>
        ) : (
          <Card
            data={trackFilter}
            setSelected={setSelected}
            setTrack={setTrack}
          />
        )}
      </section>
    </>
  );
}
