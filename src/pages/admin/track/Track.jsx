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
import Card from "../../../components/admin/track/Card";
import axiosInstance from '../../../hooks/auth/utils/axiosInstance';
import { useEffect } from "react";

 
const tracks= [
  {
    id: 1,
    trackName: "Frontend Development",
    img: img,
    Manager: "Abrar Arman",
    DatePublished: "2/4/2025",
  },
  {
    id: 2,
    trackName: "Backend Development",
    img: img,
    Manager: "Abrar Arman",
    DatePublished: "2/4/2025",
  },
  {
    id: 3,
    trackName: "Full Stack Development",
    img: img,
    Manager: "Abrar Arman",
    DatePublished: "2/4/2025",
  },
  {
    id: 4,
    trackName: "Data Science",
    img: img,
    Manager: "Abrar Arman",
    DatePublished: "2/4/2025",
  },
  {
    id: 5,
    trackName: "Cybersecurity",
    img: img,
    Manager: "Abrar Arman",
    DatePublished: "2/4/2025",
  },
];

const cols = ["Track", "Manager", "Date Published"];
// const [tracks2,setTracks]= useState([]);
export default function Track() {

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axiosInstance.get("/tracks", {
         
          headers: {
           'Accept': 'application/json'
            
          }
        });
         console.log("response from server",response);
         console.log("data-",response.data);
        //  setTracks(response);
         
       
      } catch (err) {
       console.log(err.message , "--- Failed to fetch team members");
      } 
    };

    fetchTeamMembers();
  }, []);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [selected, setSelected] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const navigate = useNavigate();
  let trackFilter = tracks;
  let isLoading = false;
  const handleEdit = () => {
    console.log("Edit action clicked");
  };

  const handleViewDetails = () => {
    console.log("View Details action clicked");
  };

  const handleDelete = (id) => {
    setSelected("delete");
    setTrackId(id);
  };

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
        onClick: () => handleEdit(track.id),
      },
      {
        name: "View Details",
        onClick: () => handleViewDetails(track.id),
      },
      {
        name: "Delete Track",
        onClick: () => handleDelete(track.id),
      },
      {
        name: "Toggle Track",
        onClick: () => handleDelete(track.id),
      },
    ];
    return (
      <tr className="border border-[var(--table-border)] text-sm">
        <td className="p-3 text-[var(--text-color)] ">
          <div className="flex flex-col items-start gap-2 max-w-[200px]">
            <img
              className="w-15 h-15 object-cover"
              src={track.img}
              alt={track.trackName}
            />
            <h2 className="font-semibold">{track.trackName}</h2>
          </div>
        </td>
        <td className="p-3 ">
          <span className="bg-blue-100 rounded-full block px-3 py-1.5  text-blue-800 font-medium w-fit">
            {track.Manager}
          </span>
        </td>
        <td className="p-3  font-semibold">
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
          <div className="pl-4 mt-1.5 pt-4 pb-6">
            <Table data={trackFilter} cols={cols} row={renderRow} />
          </div>
        ) : (
          <Card data={trackFilter} />
        )}
      </section>
    </>
  );
}
