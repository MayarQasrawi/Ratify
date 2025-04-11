import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../components/shared/modal/Modal";
import Action from "../../../components/admin/shared/Action";
import Table from "../../../components/admin/shared/Table";
import { AiOutlinePlus } from "react-icons/ai";
import Search from "../../../components/admin/shared/Search";
import img from "../../../assets/img/tracks/frontEnd.png";
import { FaSadTear } from "react-icons/fa";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import useGetAllTraks from "../../../hooks/admin/tracks/useGetAllTracks";
import Loading from "../../../components/admin/shared/Loading";
import Error from "../../../components/admin/shared/Error";
import useDeleteTrack from "../../../hooks/admin/tracks/useDeleteTrack";
import Card from '../../../components/admin/track/Card'

 
const tracks= [
  {
    id: 1,
    name: "Frontendj Development",
    img: img,
    status: true,
    DatePublished: "2/4/2025",
    description:'testkkkkkkkkkkkkkkkkkkk',
    objectives:'test1',
    associatedSkills:[{skill:'html', description:'hhhhhhhh'}]
  },
  {
    id: 2,
    trackName: "Backend Development",
    img: img,
    status: true,
    DatePublished: "2/4/2025",
  },
  {
    id: 3,
    trackName: "Full Stack Development",
    img: img,
    status: false,
    DatePublished: "2/4/2025",
  },
  {
    id: 4,
    trackName: "Data Science",
    img: img,
    status: true,
    DatePublished: "2/4/2025",
  },
  {
    id: 5,
    trackName: "Cybersecurity",
    img: img,
    status: false,
    DatePublished: "2/4/2025",
  },
];

const cols = ["Track", "Status", "Date Published",' '];
export default function Track() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [selected, setSelected] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const navigate = useNavigate();
  const {data}= useGetAllTraks()
  let isLoading=false
  console.log(data,'from api')
 const {mutate: deleteTrack,
  isPending,
  isSuccess,
  error} =useDeleteTrack()
  let trackFilter = tracks ?? [];
  const handleEdit = (track) => {
    console.log("Edit action clicked");
    console.log(track)
    navigate('/dashboard/Admin/tracks/setup',{state:{track}})
  };

  const handleViewDetails = () => {
    console.log("View Details action clicked");
  };

  const handleDelete = (id) => {
    setSelected("delete");
    console.log(id)
    setTrackId(id);
  };
  console.log(trackId,'check id pass')
//  if(isLoading){
//   return <div className="h-[70vh] flex items-center justify-center"> 
//   <Loading /></div>
//  }
//  if(isError){
//  return <div className="h-[70vh]  flex items-center justify-center"><div className="h-full w-full"> <Error /></div></div>
//  }
  if (search)
    trackFilter = tracks.filter((track) =>
      track.trackName.toUpperCase().includes(search.toUpperCase())
    );
  if (trackFilter.length == 0 && isLoading == false) {
    return (
      <>
        <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center h-[50vh]">
          <FaSadTear className="mx-auto  text-4xl text-blue-500" />
          <p className="text-lg text-gray-900">No Track found...</p>
          <p className="text-sm">Try searching for a different track.</p>
        </div>
      </>
    );
  }
  const renderRow = (track) => {
    const actions = [
      {
        name: "Edit Track",
        onClick: () => handleEdit(track),
      },
      {
        name: "View Details",
        onClick: () => handleViewDetails(track.id),
      },
      {
        name: "Delete Track",
        onClick: () => handleDelete(track.id),
      },
    ];
    return (
      <tr className="border border-[var(--table-border)] text-sm text-center ">
        <td className="p-3 text-[var(--text-color)] text-center ">
          <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2 max-w-[200px]">
            <img
              className="w-15 h-15 object-cover"
              src={track.img}
              alt={track.trackName}
            />
            <h2 className="font-semibold">{track.trackName}</h2>
          </div>
          </div>
        </td>
        <td className="py-3 px-1 lg:px-3  text-center">
          <div className=" flex justify-center ">
          <div
            className={`flex items-center  justify-center w-fit gap-1 p-1 md:px-3 font-medium py-1 text-xs rounded-full ${
              track.status
                ? "sm:bg-green-100 dark:sm:bg-green-200 text-green-800"
                : "sm:bg-red-100 dark:sm:bg-red-200 text-red-800"
            }`}
          >
            {track.status === true ? (
              <span className="block w-1.5 h-1.5 rounded-full bg-green-600"></span>
            ) : (
              <span className="block w-1.5 h-1.5 rounded-full bg-red-600"></span>
            )}
            <span className=""> {track.status?'Active':'Inactive'}</span>
          </div>
          </div>
          </td>
        <td className="p-3  font-semibold text-center">
          <div className="pl-7">{track.DatePublished}</div>
        </td>
        <td className="p-3">
          <Action actions={actions} />
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
              setTrackId(null);
            }}
            Confirm={()=> deleteTrack(trackId)}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={error}
          >
            Are you sure you want to delete this track?
          </ConfirmationModal>
        </Modal>
      )}
      <section className="pr-3">
        <div className="pl-4 mt-3 gap-y-3 justify-start flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
            <Search search={search} setSearch={setSearch} />
          </div>
          <button
            onClick={() => navigate("/dashboard/Admin/tracks/setup")}
            className="text-white w-fit font-medium rounded-lg bg-blue-500 cursor-pointer px-3.5 py-2 text-sm hover:bg-[var(--secondary-color)] transition"
          >
            <div className="flex gap-1 items-center">
              <AiOutlinePlus className="font-medium" />
              <span>Add Track</span>
            </div>
          </button>
        </div>
        <div className="pl-4 mt-2.5 text-sm">
          <div className="flex gap-6">
            <button
              onClick={() => setViewMode("table")}
              className={`cursor-pointer pb-2 ${
                viewMode === "table"
                  ? "border-b-2 border-blue-600 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`cursor-pointer pb-2 ${
                viewMode === "card"
                  ? "border-b-2 border-blue-600 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        {viewMode == "table" ? (
          <div className=" ">
          <div className="pl-4 mt-1.5 pt-4 pb-6 min-w-[500px]">
            <Table data={trackFilter} cols={cols} row={renderRow} />
          </div>
          </div>
        ) : (
          <Card data={trackFilter} />
        )}
      </section>
    </>
  );
}
