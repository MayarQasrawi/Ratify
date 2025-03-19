import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdPassword, MdEmail } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Modal from '../../shared/Modal'
import EmailChangeModal from '../../shared/EmailChangeModal'
import PasswordChangeModel from "../../shared/PasswordChangeModal";
import Extract from "../../../utils/Extract";

export default function Navbar() {
  const { logout,auth } = useAuthContext();
  let role='Admin'
  // if(auth)
  //   role=Extract(auth ,'role')
  const [isOpen, setIsOpen] = useState(false);
  const [changePasswordModel,setShowChangePasswordModal]=useState(false);
  const [changeEmailModel,setShowChangeEmailModal]=useState(false);
  return (
  <>
       <nav className="py-3 px-6 w-full flex justify-end border-b border-[#E7ECFF] bg-white relative">
        <FaUserCircle
          size={32}
          color="#E7ECFF"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:text-gray-600 transition"
        />
        {isOpen && (
          <div className="absolute z-20 right-6 top-14 w-44 bg-white shadow-lg rounded-lg border border-gray-200">
            <button
              className="cursor-pointer w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                setShowChangePasswordModal(true);
                setIsOpen(false);
              }}
            >
              <MdPassword size={18} /> Change Password
            </button>
          { role !='Admin' && <button
              className="w-full cursor-pointer px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                setShowChangeEmailModal(true);
                setIsOpen(false);
              }}
            >
              <MdEmail size={18} /> Change Email
            </button>}
            <hr className="border-gray-200" />
            <button
              className="w-full cursor-pointer px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2"
              onClick={logout}
            >
              <HiOutlineLogout size={18} /> Logout
            </button>
          </div>
        )}
    </nav>

   {changePasswordModel && <Modal><PasswordChangeModel /></Modal>}
   {changeEmailModel && <Modal><EmailChangeModal setShowChangeEmailModal={setShowChangeEmailModal} /></Modal>}
    </>
  );
}
