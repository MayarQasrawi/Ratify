import { useLocation, useNavigate } from "react-router-dom";
import Back from "../../../components/shared/dashboard/Back";
export default function TrackDetailsPage() {
  const location = useLocation();
  const trackData = location.state.track;
  console.log(trackData);
  const navigate = useNavigate();

  return (
    <>
      <Back
        text="Back To Tracks"
        onClick={() => {
          navigate('/dashboard/admin/tracks');
        }}
      />

      <div className="min-h-[85vh] block md:flex md:items-center">
        <div className="md:container md:mx-auto sm:px-4 py-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-2xl mb-8 border border-blue-50 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 pb-0 p-4 sm:pb-4 flex items-center sm:block">
                <h1 className="text-md sm:text-[20px] md:text-2xl lg:text-3xl font-bold text-[var(--main-color)] mb-3 dark:text-white">
                  {trackData.name}
                </h1>
                <p className="text-xs hidden sm:block sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {trackData.description}
                </p>

                <div className="mb-4 items-center hidden sm:flex">
                  <span className="text-sm sm:text-md font-medium text-gray-800 dark:text-gray-200">
                    Status:
                  </span>
                  <span
                    className={`ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold 
                    ${
                      trackData.
isActive
                        ? "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-200"
                        : "bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-200"
                    }`}
                  >
                    {trackData.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <img
                  src={trackData.image}
                  alt={trackData.name}
                  className="w-[35%] min-w-[80px] block sm:hidden md:block md:w-[35%] lg:w-[40%] mx-auto lg:mt-4"
                />
              </div>
              <div className="lg:w-1/3 lg:bg-blue-50 dark:lg:bg-blue-900 pb-6 lg:p-4 px-4 lg:border-t lg:border-blue-100 dark:lg:border-blue-900">
                <h2 className="text-sm sm:text-lg font-semibold text-[var(--main-color)] mb-4 dark:text-white">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trackData.associatedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className={`cursor-pointer px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition duration-300 
                    ${
                      index % 2 === 0
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 hover:bg-[var(--main-color)] hover:text-white"
                        : "bg-[var(--main-color)] text-white dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-800"
                    }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



