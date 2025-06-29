import { useState } from "react";
import Action from "../shared/Action";
import Modal from "../../shared/modal/Modal";
import ConfirmationModal from "../../shared/modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import useDeleteTrack from "@/hooks/Admin/tracks/useDeleteTrack";

export default function Card({ data, setTrack, setSelected }) {
  const { mutate: deleteTrack, isPending, isSuccess, error } = useDeleteTrack();
  const navigate = useNavigate();

  const handleEdit = (track) => {
    console.log("Edit action clicked");
    console.log(track);
    navigate("/dashboard/Admin/tracks/setup", { state: { track } });
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

  const handleDeleteManager = (track) => {
    setSelected("delete-manager");
    setTrack(track);
  };

  console.log("card error", error);

  return (
    <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          <div
            key={track.id}
            className="group relative cursor-pointer rounded-xl bg-[var(--sidebar-bg)] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  track.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {track.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
              <Action actions={actions} icon={false} />
            </div>
            <div className="relative h-48 overflow-hidden">
              <img
                src={`${import.meta.env.VITE_API}${track.image}`}
                alt={track.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
               
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                {track.name}
              </h3>
              {isMangerAssign && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Manager Assigned</span>
                </div>
              )}
            </div>

            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-300 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
}
