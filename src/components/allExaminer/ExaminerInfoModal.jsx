import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaPen } from "react-icons/fa";
import useUpdateExaminerInfo from "../../hooks/examiner/useUpdateExaminerInfo";
import useUploadImage from "../../hooks/useUploadImage";
import { useAuthContext } from "../../contexts/AuthProvider";
import Extract from "../../utils/Extract";
import Alert from "../shared/Alert";

export default function ExaminerInfoModal({ setShowModal }) {
  const { auth } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [imageError, setImageError] = useState(null);
  const [infoError, setInfoError] = useState(null);
  const fileInputRef = useRef();
  const { mutateAsync: updateInfo } = useUpdateExaminerInfo();
  const { mutateAsync: uploadImage } = useUploadImage();
  let id;
  if (auth) id = Extract(auth, "nameid");
  const totalSteps = 2;
  const imageFile = watch("image");
  console.log(imageFile);
  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : null;
  const handleClick = () => fileInputRef.current?.click();
  const handleImageChange = (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("image", {
          type: "manual",
          message: "Only JPG, PNG, or WebP images are allowed.",
        });
        return;
      }
      clearErrors("image");
      setValue("image", file, { shouldValidate: true });
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data);
    const info={fullName:data.fullName,specialization: data.specialization, dateOfBirth: data.dateOfBirth, gender: Number(data.gender)}
    console.log(info,'kkkk')
    formData.append("image", data.image);
    const [imgResult, infoResult] = await Promise.allSettled([
      uploadImage({ id, body: formData }),
      updateInfo({ id, body: {...info} }),
    ]);

    if (imgResult.status === "rejected") {
      setImageError("Image upload failed. You can retry later.");
    }
    if (infoResult.status === "rejected") {
      setInfoError("Saving your profile failed. Please try again.");
      setShowModal(false);
      return;
    }
  };
  const handleNext = (data) => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      onSubmit(data);
    }
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <>
    {imageError && <Alert type='error' message={imageError} />}
    <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen overflow-y-auto">
      <div className="relative w-full max-w-md mx-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-custom border border-white border-opacity-20">
        <div className="relative px-6 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, Examiner!
            </h2>
            <p className="text-gray-600 mt-2">
              Please complete your profile information
            </p>
            <div className="flex justify-center items-center mt-6 space-x-4">
              {Array.from({ length: totalSteps }, (_, ind) => (
                <div
                  key={ind}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                    step === ind + 1
                      ? "bg-blue-500 text-white font-bold shadow"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {ind + 1}
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleNext)}
            className="space-y-5"
            encType="multipart/form-data"
          >
            {step === 1 && (
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div
                  className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 cursor-pointer flex items-center justify-center"
                  onClick={handleClick}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaUser className="text-gray-400 text-5xl" />
                  )}
                </div>
                <div
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-blue-700 transition"
                  onClick={handleClick}
                >
                  <FaPen className="text-white text-xs" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {errors.image.message}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <>
               <div>
                    <label className="block text-gray-700 font-medium mb-2">
                    full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("fullName", { required: true })}
                      className="w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-xl outline-none"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">
                        This field is required
                      </p>
                    )}
                  </div>
                 <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("specialization", { required: true })}
                      className="w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-xl outline-none"
                      placeholder="e.g. Front‑end, Data Science…"
                    />
                    {errors.specialization && (
                      <p className="text-red-500 text-sm">
                        This field is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("dateOfBirth", { required: true })}
                      className="w-full px-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-xl outline-none"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm">
                        Please select your date of birth
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-6">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value={0}
                          {...register("gender", { required: true })}
                        />
                        <span className="ml-2">Male </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value={1}
                          {...register("gender", { required: true,})}
                         
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-sm">
                        Please select your gender
                      </p>
                    )}
                  </div>
              </>
            )}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-5 py-3 cursor-pointer bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="submit"
                className="px-5 py-3  cursor-pointer bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-400 transition shadow-lg"
              >
                {step < totalSteps ? "Continue" : "Complete Setup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
