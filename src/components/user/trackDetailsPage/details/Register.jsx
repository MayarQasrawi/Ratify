import { FaBriefcase, FaRocket } from "react-icons/fa";
import Button from "../shared/Button";
import { useState } from "react";
import Modal from "../../../shared/modal/Modal";
import { MdClose } from "react-icons/md";
import { useAuthContext } from "../../../../contexts/AuthProvider";
import EnrollmentModal from "../shared/EnrollmentModal";
import { useParams } from "react-router-dom";
import Extract from "../../../../utils/Extract";
import useGetApplicantTrack from "../../../../hooks/applicant/enroll/useGetApplicantTrack";

export default function Register() {
  const [show, setShow] = useState(false);
  const { auth } = useAuthContext();
  const { id } = useParams();
  let authId = null;
  if (auth) authId = Extract(auth, "nameid");
  const { data: MyTracks, isLoading } = useGetApplicantTrack(authId);
  console.log(
    MyTracks?.data?.data?.map((tr) => tr.trackId).includes(+id),
    "inside card test jjjjjjjjjjjjj ",+id
  );
  return (
    <>
      {show && (
        <Modal>
          {auth ? (
            <EnrollmentModal
              trackId={id}
              setShow={setShow}
              title="Enroll Now &#10148;"
              description="Our unique assessment tracks are not just about learning—they're about discovering the essence of your strengths and matching them against the pulse of today's market demands. Register and log in to experience an evaluation crafted by industry visionaries, and step confidently into a future aligned with professional excellence."
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
      {
       !( MyTracks?.data?.data?.map((tr) => tr.trackId).includes(+id)) && (
          <section className="mt-24 w-[90%] mx-auto py-18 px-5 bg-[#003F7D] rounded-2xl">
            <div className="flex flex-wrap justify-center gap-9 items-center">
              <div className="text-white w-[60%] text-2xl font-medium ">
                <p className="w-[90%] text-center">
                  Want to know more about the Tracks?
                </p>
              </div>
              <div>
                <Button py="12" px="60" showModal={() => setShow(true)} />
              </div>
            </div>
          </section>
        )}
    </>
  );
}
