import { useState } from "react";
import Alert from "../../shared/Alert";
import { FiUpload } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import Header from "./shared/Header";
import { useLocation } from "react-router-dom";

export default function UploadImage({ ref }) {
  const location=useLocation();
  const [image, setImage] = useState(()=>location.state?location.state.track.img:null);
  const [error, setError] = useState("");
  if(location?.state)
  ref.current=location.state.track.img
  const handleImageUpload = (file) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        setImage(null);
        return;
      }
      setError("");
      ref.current = file;
      setImage(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file,'check imge')
    handleImageUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  };

  return (
    <>
      {error && <Alert message={error} type="error" />}
      <div className="bg-[var(--sidebar-icon-bg)] rounded-lg p-3 text-gray-900 font-medium">
        <div className="flex justify-between">
          <Header>Track Thumbnail</Header>
          {image && (
            <div
              onClick={() => setImage(null)}
              className="flex gap-1.5 items-center text-sm text-blue-600 font-medium cursor-pointer"
            >
              <FaPencilAlt className="text-sm" />
              <span className="text-[10px] sm:text-[12px]">Edit Image</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`${
              image ? "border-none" : "border border-dashed border-gray-400"
            } min-h-[180px] flex items-center justify-center`}
          >
            <div className="flex items-center flex-col gap-2">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className="w-[70%] rounded-lg"
                />
              ) : (
                <>
                  <p className="text-[12px] text-blue-600">
                    Choose image or drag and drop
                  </p>
                  <FiUpload className="text-2xl text-blue-600 cursor-pointer" />
                </>
              )}
            </div>
            <input type="file" hidden onChange={handleFileChange} />
          </label>
        </div>
      </div>
    </>
  );
}

