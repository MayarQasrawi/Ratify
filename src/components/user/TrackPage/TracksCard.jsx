import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import Button from "../trackDetailsPage/shared/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Modal from '../../shared/modal/Modal'
import EnrollmentModal from '../trackDetailsPage/shared/EnrollmentModal'
function TracksCard({ header, description, img, id }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // const { auth } = useAuthContext();
  let auth='hhh'
  return (
    <>
      {show && (
        <Modal>
          {auth ? (
            <EnrollmentModal
              setShow={setShow}
              title="Enroll Now &#10148;"
              description="Our unique assessment tracks are not just about learning—they're about discovering the essence of your strengths and matching them against the pulse of today's market demands. Register and log in to experience an evaluation crafted by industry visionaries, and step confidently into a future aligned with professional excellence."
            />
          ) : (
            <EnrollmentModal
              title="&#128274; Login Required"
              description="Please Login First."
              setShow={setShow}
              trackId={id}
            />
          )}
        </Modal>
      )}
      <div>
        <div className="rounded-lg bg-[var(--secondary-color)]  h-65 p-6 transition-transform hover:shadow-lg">
          <img src={img} className="w-30 h-30 block mx-auto" />
        </div>
        <div className="bg-white relative -mt-24 shadow text-center  text-xl  h-50 rounded-lg p-3  w-[90%] mx-auto ">
          <div className="h-24">
            <h1 className="font-bold">{header}</h1>
            <p className="text-gray-600 text-sm  ">{description}</p>
          </div>
          <div className="mt-5 ">
            <button
              onClick={() =>{ navigate(`/track-details/${id}`);scrollTo(0, 0)}}
              className="text-[#3B82F6] cursor-pointer  text-sm border-1 items-center border-[#3B82F6] py-1 px-4 rounded-lg hover:border-[#2A5C8A] hover:text-[#2A5C8A]"
            >
              Details <BiShowAlt className="inline text-xl" />
            </button>
            <div className="mt-3.5">
              <Button px="28" py="6" showModal={() =>{ setShow(true)}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TracksCard;
