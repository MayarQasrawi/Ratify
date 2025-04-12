import { useState } from "react";
import Action from "../shared/Action";
import Modal from "../../shared/modal/Modal";
import ConfirmationModal from "../../shared/modal/ConfirmationModal";
import useGetAllTraks from "../../../hooks/admin/tracks/useGetAllTracks";
import useDeleteTrack from "../../../hooks/admin/tracks/useDeleteTrack";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/admin/shared/Loading";
export default function Card({ data }) {
  const [selected, setSelected] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const { mutate: deleteTrack, isPending, isSuccess, error } = useDeleteTrack();
  const navigate=useNavigate()

  const handleEdit = (track) => {
    console.log("Edit action clicked");
    console.log(track)
    navigate('/dashboard/Admin/tracks/setup',{state:{track}})
  };

  const handleViewDetails = () => {
    console.log("View Details action clicked");
  };

  const handleDelete = (id) => {
    console.log(`card ${id}`);
    setSelected("delete");
    setTrackId(id);
  };
  console.log("card error",error);
//    if(isLoading){
//   return <div className="h-[70vh] flex items-center justify-center"> 
//   <Loading /></div>
//  }
  return (
    <div className="mt-4  grid sm:grid-cols-2 md:grid-cols-3  gap-4 text-center">
      {selected == "delete" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
              setSelected(null);
              setTrackId(null);
            }}
            Confirm={() => deleteTrack(trackId)}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={error}
          >
            Are you sure you want to delete this track?
          </ConfirmationModal>
        </Modal>
      )}
      {data.map((track) => {
        const actions = [
          ...(track.isActive
            ? [
                {
                  name: "Edit Track",
                  onClick: () => handleEdit(track),
                },
                {
                  name: "Delete Track",
                  onClick: () => handleDelete(track.id),
                },
              ]
            : [
                {
                  name: "Toggle Track",
                  onClick: () => handleEdit(track),
                },
              ]),
          {
            name: "View Details",
            onClick: () => handleViewDetails(track.id),
          },
        ];
        return (
          <div key={track.id} className="rounded-lg  bg-white shadow ">
            <div className="flex justify-between ">
              <img
                src={track.image}
                alt={track.name}
                className="w-1/4 sm:w-1/2 block mx-auto h-auto object-cover"
              />
              <Action actions={actions} icon={false} />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 truncate">
                {track.name}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
