import Lottie from "lottie-react";
import enrollSuccess from "../../../../assets/img/animation/enrollSuccess";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
export default function SuccessEnroll({setShow,link}) {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-end">
        <button
          onClick={() => setShow(false)}
          className=" cursor-pointer text-gray-500 hover:text-red-500 transition"
        >
          <MdClose className="w-6 h-6" />
        </button>
      </div>
       <h1 className="text-[28px] font-bold text-[var(--secondary-color)] mb-3">
        Welcome to Ratify!
      </h1>
      <div className="mb-4 flex justify-center">
         
        <div>
          <Lottie
            animationData={enrollSuccess}
            loop={false}
            autoplay={true}
            className="w-[300px] h-[180px] "
          />
        </div>
      </div>
    
      <p className="text-gray-600 mb-6">
        We provide AI assistance to help you prepare for your assessments.
      </p>
      <Link to={link} className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium py-2 px-6 rounded-md w-full">
        Get Started
      </Link>
    </div>
  );
}
