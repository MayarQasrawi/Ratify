import { useState } from "react";
import Action from "../shared/Action";
import Modal from "../../shared/modal/Modal";
import ConfirmationModal from "../../shared/modal/ConfirmationModal";
import useDeleteTrack from "../../../hooks/admin/tracks/useDeleteTrack";
import { useNavigate } from "react-router-dom";
export default function Card({ data,setTrack,setSelected }) {
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
    console.log("assign manger", track.id);
    console.log(isMangerAssign);
    if (isMangerAssign == false) setSelected("assign-manger");
    else {
      setSelected("edit-manger");
    }
    setTrack(track);
  };
  const handleDeleteManager=(track)=>{
   setSelected("delete-manager");
    setTrack(track);
  }
  console.log("card error",error);
  return (
    <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3  gap-4 text-center">
      {data.map((track) => {
         const isMangerAssign = track.examinerId != null;
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
              name: isMangerAssign ? "Edit Manager" : "Add Manager",
              onClick: () => handleAssignManger(track, isMangerAssign),
            },
          ]
        : [
            {
              name: "Toggle Track",
              onClick: () => handleToggle(track),
            },
             {
              name: "Delete Manager",
              onClick: () => handleDeleteManager(track),
            },
          ]),
      {
        name: "View Details",
        onClick: () => handleViewDetails(track),
      },
    ];
        return (
          <div key={track.id} className="rounded-lg  bg-[var(--sidebar-bg)] shadow ">
            <div className="flex justify-between ">
              <img
                src={`https://40b8-85-113-123-99.ngrok-free.app/${track.image}`}
                alt={track.name}
                className="w-1/4 sm:w-1/2 block mx-auto h-auto object-cover"
              />
              <Action actions={actions} icon={false} />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 truncate dark:text-white">
                {track.name}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
