import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TrackInput from "../../../components/admin/track/TrackInput";
import Select from "../../../components/admin/track/Select";
import UploadImage from "../../../components/admin/track/UploadImage";
import AssociatedSkills from "../../../components/admin/track/AssociatedSkills";
import Alert from "../../../components/shared/Alert";

export default function TrackSetup() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const objectivesRef = useRef();
  const selectRef = useRef();
  const imageRef = useRef();
  const skillsRef = useRef();
  const [showAlert, setShow] = useState(false);
  const trackField = [
    { title: "Track Title", textArea: false, ref: titleRef },
    { title: "Track Description", textArea: true, ref: descriptionRef },
    { title: "Track Objectives", ref: objectivesRef },
  ];
  useEffect(() => {
    if (showAlert) setTimeout(() => setShow(false), 3000);
  }, [showAlert]);
  const handleAddTrack = () => {
    if (
      titleRef.current == "" ||
      descriptionRef.current == "" ||
      objectivesRef.current == "" ||
      selectRef.current == "null" ||
      imageRef.current == undefined ||
      skillsRef.current.length == 0
    ) {
      setShow(true);
      return;
    }
    const formData = new FormData();
    console.log(selectRef.current);
    console.log(titleRef.current);
    console.log(descriptionRef.current);
    console.log(imageRef.current);
    console.log(skillsRef.current);
  };
  return (
    <section className="py-8 px-14">
      {showAlert && <Alert type="error" message="All fields requried . " />}
      <div className="flex flex-col items-start md:flex-row gap-y-4 md:justify-between md:items-center bg-transparent py-2">
        <div
          onClick={() => navigate("/dashboard/Admin/tracks")}
          className="flex  items-center gap-2 text-lg font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
        >
          <AiOutlineArrowLeft className="text-xl" />
          <span>Back to Tracks</span>
        </div>
        <button
          onClick={handleAddTrack}
          className="bg-blue-500 text-sm  cursor-pointer text-white font-medium px-6 py-2 rounded-md transition hover:bg-blue-600 active:scale-95"
        >
          Publish Track
        </button>
      </div>

      <div className="flex flex-col  md:pl-20 lg:px-14 lg:flex-row mt-8 gap-8 lg:justify-between ">
        <div className="w-[97%] sm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col gap-4">
          {trackField.map((field, ind) => (
            <TrackInput key={ind} field={field} ind={ind} ref={field.ref} />
          ))}
          <Select selectRef={selectRef} />
        </div>
        <div className="w-[97%] sm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col gap-4">
          <UploadImage ref={imageRef} />
          <AssociatedSkills ref={skillsRef} />
        </div>
      </div>
    </section>
  );
}
