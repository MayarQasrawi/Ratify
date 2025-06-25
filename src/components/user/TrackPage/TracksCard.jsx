import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import Button from "../trackDetailsPage/shared/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Modal from "../../shared/modal/Modal";
import EnrollmentModal from "../trackDetailsPage/shared/EnrollmentModal";
import Extract from "../../../utils/Extract";
import useGetApplicantTrack from "../../../hooks/applicant/enroll/useGetApplicantTrack";
function TracksCard({ header, description, img, id, enrollId }) {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_API, "import.meta.env.VITE_API");
  const [show, setShow] = useState(false);
  const { auth } = useAuthContext();
  let authId = null;
  if (auth) authId = Extract(auth, "nameid");
  const { data: MyTracks, isLoading } = useGetApplicantTrack(authId);
  // console.log(id, "iside track card ddddddddddddddddddd", auth);
  // console.log(MyTracks?.data?.data?.map(tr=>tr.trackId),'iside card test jjjjjjjjjjjjj ')
  //   console.log(MyTracks?.data?.data )
  console.log(enrollId, " enrollId  enrollId  enrollId");
  return (
    <>
      {show && (
        <Modal>
          {auth ? (
            <EnrollmentModal
              setShow={setShow}
              title="Enroll Now &#10148;"
              description="Our unique assessment tracks are not just about learning—they're about discovering the essence of your strengths and matching them against the pulse of today's market demands. Register and log in to experience an evaluation crafted by industry visionaries, and step confidently into a future aligned with professional excellence."
              trackId={id}
              link={`/applicant/my-tracks/${header}/${enrollId[0]?.id}`}
            />
          ) : (
            <EnrollmentModal
              title="&#128274; Login Required"
              description="Please Login First."
              setShow={setShow}
            />
          )}
        </Modal>
      )}
      <div>
        <div className="rounded-lg bg-[var(--secondary-color)]  h-72 p-6 transition-transform hover:shadow-lg">
          <img
            src={`${import.meta.env.VITE_API}${img}`}
            className="w-40 h-30 block mx-auto rounded"
          />
        </div>
        <div className="bg-white relative -mt-24 shadow text-center  text-xl  h-60 rounded-lg p-3  w-[90%] mx-auto ">
          <div className="h-24">
            <h1 className="font-bold">{header}</h1>
            <p className="text-gray-600 text-sm  ">{description}</p>
          </div>
          <div className="mt-14 ">
            <button
              onClick={() => {
                navigate(`/track-details/${id}`);
                scrollTo(0, 0);
              }}
              className="text-[#3B82F6] cursor-pointer  text-sm border-1 items-center border-[#3B82F6] py-1 px-4 rounded-lg hover:border-[#2A5C8A] hover:text-[#2A5C8A]"
            >
              Details <BiShowAlt className="inline text-xl" />
            </button>
            <div className="mt-3.5">
              {auth &&
              MyTracks.data.data.length > 0 &&
              MyTracks?.data?.data?.map((tr) => tr.trackId).includes(id) ? (
                <button
                  onClick={() => {
                    navigate(
                      `/applicant/my-tracks/${header}/${enrollId[0]?.id}`,
                      {
                        state: { trackId: id },
                      }
                    );
                  }}
                  className="inline-block cursor-pointer bg-blue-500 text-white text-sm  hover:bg-[#2A5C8A] transition-colors font-medium px-6 py-2 rounded-2xl"
                >
                  Go To Track
                </button>
              ) : (
                <Button
                  px="28"
                  py="6"
                  showModal={() => {
                    setShow(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TracksCard;
