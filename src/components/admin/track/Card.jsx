import { useState } from "react";
import Action from "../shared/Action";
import Modal from "../../shared/modal/Modal";
import ConfirmationModal from "../../shared/modal/ConfirmationModal";

export default function Card({ data }) {
  const [selected, setSelected] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const handleEdit = () => {
    console.log("Edit action clicked");
  };

  const handleViewDetails = () => {
    console.log("View Details action clicked");
  };

  const handleDelete = (id) => {
    setSelected("delete"); setTrackId(id);
  };

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
          >
            Are you sure you want to delete this track?
          </ConfirmationModal>
        </Modal>
      )}
      {data.map((track) => {
        const actions = [
          {
            name: "Edit",
            onClick: () => handleEdit(track.id),
          },
          {
            name: "View Details",
            onClick: () => handleViewDetails(track.id),
          },
          {
            name: "Delete",
            onClick: () => handleDelete(track.id),
          },
        ];
        return (
          <div key={track.id} className="rounded-lg  bg-white shadow ">
            <div className="flex justify-between ">
              <img
                src={track.img}
                alt={track.trackName}
                className="w-1/4 sm:w-1/2 block mx-auto h-auto object-cover"
              />
              <Action actions={actions} icon={false} />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 truncate">
                {track.trackName}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
