import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TrackInput from "../../../components/admin/track/TrackInput";
import Select from "../../../components/admin/track/Select";
import UploadImage from "../../../components/admin/track/UploadImage";
import AssociatedSkills from "../../../components/admin/track/AssociatedSkills";
import Alert from "../../../components/shared/Alert";
import useAddTrack from "../../../hooks/admin/tracks/useAddTrack";
import Spinner from "../../../components/shared/Spinner";
import useUpdateTrack from "../../../hooks/admin/tracks/useUpdateTrack";
import { IoIosReturnLeft } from "react-icons/io";
import Back from "../../../components/shared/dashboard/Back";

export default function TrackSetup() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const location = useLocation();
  console.log(location?.state, "get pre info");
  const descriptionRef = useRef();
  const objectivesRef = useRef();
  const selectRef = useRef();
  const imageRef = useRef();
  const skillsRef = useRef();
  const [showAlert, setShow] = useState(false);
  const {
    mutate: addTrack,
    isError: isTrackError,
    isPending: isTrackPending,
  } = useAddTrack();
  const { mutate: updateTrack, isError, isPending } = useUpdateTrack();
  const trackField = [
    { title: "Track Title", textArea: false, ref: titleRef, name: "name" },
    {
      title: "Track Description",
      textArea: true,
      ref: descriptionRef,
      name: "description",
    },
    {
      title: "Track Objectives",
      textArea: true,
      ref: objectivesRef,
      name: "objectives",
    },
  ];
  useEffect(() => {
    if (showAlert) setTimeout(() => setShow(false), 3000);
  }, [showAlert]);
  console.log(isTrackPending || isPending, "addtr");
  const handleAddTrack = () => {
    // console.log(selectRef.current,'manger');
    console.log(titleRef.current, "name");
    console.log(descriptionRef.current, "de");
    console.log(imageRef.current, "imgemmm");
    console.log(skillsRef.current);
    if (
      titleRef.current == "" ||
      descriptionRef.current == "" ||
      objectivesRef.current == ""
    ) {
      setShow(true);
      return;
    }
    const formData = new FormData();
    console.log(titleRef.current, "name");
    console.log(descriptionRef.current, "de");
    console.log(imageRef.current, "imgemmm");
    console.log(skillsRef.current, "list skill hhhhhh");
    formData.append("name", titleRef.current);
    formData.append("description", descriptionRef.current);
    formData.append("objectives", objectivesRef.current);
    formData.append("imageFile", imageRef.current);
    if (!location.state) {
      formData.append("seniorExaminerID", "");
      const result = skillsRef.current.reduce((acc, item) => {
        acc[item.name] = item.description;
        return acc;
      }, {});
      console.log(JSON.stringify(result),'inside add .......................')
      formData.append("associatedSkills", JSON.stringify(result));
      console.log("inside add track jjjjjjjjjjjjjjjjjjjjjjjjjjj");
      console.log(skillsRef.current);
      addTrack(formData);
    } else {
      console.log(
        skillsRef.current.map((item) => ({
          skill: item.skill,
          description: item.description,
        })),
        "id"
      );
      const skill = skillsRef.current.map((item) => ({
        name: item.skill,
        description: item.description,
      }));
      formData.append(
        "associatedSkills",
        skill.map((s) => ({ name: s.name, description: s.description }))
      );
      updateTrack(formData);
    }
  };
  return (
    <>
      {isTrackError && <Alert type="error" message="Request  Fail" />}
      {isError && <Alert type="error" message="Request Fail" />}
      <section className="py-8 px-14">
        {showAlert && <Alert type="error" message="All fields requried . " />}
        <div className="flex flex-col items-start md:flex-row gap-y-4 md:justify-between md:items-center bg-transparent py-2">
          <Back
            text="Back To Tracks"
            onClick={() => navigate("/dashboard/Admin/tracks")}
          />
          <button
            onClick={handleAddTrack}
            className="bg-blue-500 text-sm flex gap-1 cursor-pointer text-white font-medium px-6 py-2 rounded-md transition hover:bg-blue-600 active:scale-95"
          >
            {isTrackPending && <Spinner />}
            {isPending && <Spinner />} {location?.state ? "Edit" : "Publish"}{" "}
            Track
          </button>
        </div>

        <div className="flex flex-col  md:pl-20 lg:px-14 lg:flex-row mt-8 gap-8 lg:justify-between ">
          <div className="w-[97%] sm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col gap-4">
            {trackField.map((field, ind) => (
              <TrackInput key={ind} field={field} ind={ind} ref={field.ref} />
            ))}
          </div>
          <div className="w-[97%] sm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col gap-4">
            <UploadImage ref={imageRef} />
            <AssociatedSkills ref={skillsRef} />
          </div>
        </div>
      </section>
    </>
  );
}
