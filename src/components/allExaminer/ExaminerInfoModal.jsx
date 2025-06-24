import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaPen } from "react-icons/fa";
import useUpdateExaminerInfo from "../../hooks/examiner/useUpdateExaminerInfo";
import useUploadImage from "../../hooks/useUploadImage";
import { useAuthContext } from "../../contexts/AuthProvider";
import Extract from "../../utils/Extract";
import Alert from "../shared/Alert";
import Spinner from "../shared/Spinner";
import { MdClose } from "react-icons/md";
import Modal from "../shared/modal/Modal";

export default function ExaminerInfoModal({
  setShowModal,
  isUpdate = false,
  updateImage,
}) {
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
  const [step, setStep] = useState(isUpdate && !updateImage ? 2 : 1);
  const [imageError, setImageError] = useState(null);
  const [infoError, setInfoError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const {
    mutateAsync: updateInfo,
    isPending: isInfoLoading,
    isError,
    isSuccess,
    data:dataInfo
  } = useUpdateExaminerInfo();
  const {
    mutateAsync: uploadImage,
    isPending: isImageLoading,
    isError: isUploadImageError,
    isSuccess: isUpdateImageSuccess,
    data,
  } = useUploadImage();
  // useEffect(() => {
  //   if (isUploadImageError || isUpdateImageSuccess) {
  //     setTimeout(() => setShowModal(), 1500);
  //   }
  // }, [isUploadImageError, isUpdateImageSuccess, isError]);
  let id;
  if (auth) id = Extract(auth, "nameid");
  console.log("inside modal");
  console.log(isInfoLoading, "update");
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
    console.log(data, "image upload");
    console.log(data.gender, "gender");
    const info = {
      fullName: data.fullName,
      specialization: data.specialization,
      dateOfBirth: data.dateOfBirth,
      gendar: data.gender,
    };
    formData.append("image", data.image);
    setIsLoading(true);
    const [imgResult, infoResult] = await Promise.allSettled([
      uploadImage({ id, body: formData }),
      updateInfo({ id, body: { ...info } }),
    ]);

    if (imgResult.status === "rejected") {
      setImageError("Image upload failed. You can retry later.");
      setIsLoading(false);
    }
    if (infoResult.status === "rejected") {
      setInfoError("Saving your profile failed. Please try again.");
      setShowModal(false);
      setIsLoading(false);
      return;
    }
    if (infoResult.status === "fulfilled") {
      setShowModal(false);
    }
    setIsLoading(false);
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
  const onUpdate = (data) => {
    if (updateImage) {
      console.log(data, "update image");
      const formData = new FormData();
      formData.append("image", data.image);
      uploadImage({ id, body: formData });
    } else {
      console.log(data, "update info");
      updateInfo({ id, body: data });
    }
  };
  console.log(data, " isUpdateImageSuccess",dataInfo);
  return (
    <>
      {imageError && <Alert type="error" message={imageError} />}
      {updateImage && isUpdateImageSuccess && <Alert message={data.message} />}
      {!updateImage &&  isSuccess && <Alert message={dataInfo.message} />}
      {isUploadImageError && (
        <Alert
          type="error"
          message="Failed to update image. Please try again later"
        />
      )}
      {isError && (
        <Alert
          type="error"
          message="Failed to update user information. Please try again later"
        />
      )}
      <div className="max-h-screen overflow-y-auto">
        <Modal>
          <div
            className={`${
              !isUpdate && "pt-6"
            } relative w-full max-w-md mx-4 bg-[var(--sidebar-bg)]  bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto  border border-white dark:border-gray-700 border-opacity-20`}
          >
            {isUpdate && (
              <div className="flex justify-end p-4 ">
                <button
                  onClick={() => setShowModal(false)}
                  className=" cursor-pointer text-gray-500 hover:text-red-500 transition"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
            )}
            <div className="relative px-6 pb-6  ">
              <div className="mb-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {!isUpdate ? (
                    " Welcome, Examiner!"
                  ) : (
                    <span>Update {updateImage ? "Image" : "info"} </span>
                  )}
                </h2>
                {!isUpdate && (
                  <p className="text-gray-600 mt-2">
                    Please complete your profile information
                  </p>
                )}
                {!isUpdate && (
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
                )}
              </div>
              <form
                onSubmit={
                  !isUpdate ? handleSubmit(handleNext) : handleSubmit(onUpdate)
                }
                className="space-y-5"
                encType="multipart/form-data"
              >
                {step === 1 && (
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div
                      className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md bg-gray-100 dark:bg-gray-800 cursor-pointer flex items-center justify-center"
                      onClick={handleClick}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <FaUser className="text-gray-400 dark:text-gray-500 text-5xl" />
                      )}
                    </div>

                    <div
                      className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 p-2 rounded-full border-2 border-white dark:border-gray-700 cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition"
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
                      <p className="text-red-500 dark:text-red-400 text-sm text-center mt-2">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                )}
                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 dark:text-white">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("fullName", { required: true })}
                        className="w-full px-4 py-3 
                    bg-white bg-opacity-80 
                   dark:bg-gray-800 dark:bg-opacity-90 
                  border border-gray-300 dark:border-gray-700 
                   text-gray-900 dark:text-gray-100 
                   rounded-xl outline-none"
                      />

                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          This field is required
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 dark:text-white">
                        Bio <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("bio", { required: true })}
                        className="w-full px-4 py-3 bg-white bg-opacity-80 dark:border-gray-700  dark:bg-gray-800 dark:bg-opacity-90 border border-gray-300 rounded-xl outline-none placeholder:text-sm"
                      />
                      {errors.specialization && (
                        <p className="text-red-500 text-sm">
                          This field is required
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 dark:text-white">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("dateOfBirth", { required: true })}
                        className="w-full px-4 py-3 bg-white bg-opacity-80 dark:border-gray-700  dark:bg-gray-800  border border-gray-300 rounded-xl outline-none"
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm">
                          Please select your date of birth
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 dark:text-white">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center space-x-6">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="Male"
                            {...register("gender", { required: true })}
                          />
                          <span className="ml-2">Male </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="Female"
                            {...register("gender", { required: true })}
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
                {!isUpdate && (
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
                      className="px-5 py-3 flex items-center gap-1  cursor-pointer bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-400 transition shadow-lg"
                    >
                      {isLoading && <Spinner />}{" "}
                      {step < totalSteps ? "Continue" : "Complete Setup"}
                    </button>
                  </div>
                )}
                {isUpdate && (
                  <div className="flex justify-end mt-3">
                    <button
                      disabled={isImageLoading || isInfoLoading}
                      type="submit"
                      className="px-5 py-3 flex items-center gap-1 disabled:cursor-not-allowed cursor-pointer 
                  bg-gradient-to-r from-blue-400 to-blue-700 
                  dark:from-blue-600 dark:to-blue-900 
                   text-white 
                   rounded-xl 
                  hover:from-blue-700 hover:to-blue-400 
                    dark:hover:from-blue-800 dark:hover:to-blue-600 
                 transition shadow-lg"
                    >
                      {(isInfoLoading || isImageLoading) && <Spinner />}
                      {updateImage ? "Update Image" : "Update Info"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
