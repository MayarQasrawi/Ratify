import React, { useState } from "react";
import useDelteAccount from "../../../hooks/auth/useDelteAccount";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { HashLink } from "react-router-hash-link";
import { MdPassword, MdEmail, MdDelete } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaArrowRight, FaCog, FaArrowDown } from "react-icons/fa";
import Modal from "../../shared/modal/Modal";
import EmailChangeModal from "../../shared/modal/EmailChangeModal";
import PasswordChangeModal from "../../shared/modal/PasswordChangeModal";
import ConfirmationModal from "../../shared/modal/ConfirmationModal";
import Extract from "../../../utils/Extract";
function Navbar() {
  const { auth, logout } = useAuthContext();
  console.log(auth, "nabbbb");
  const [isOpen, setIsOpen] = useState(false);
  const [viewOption, setviewOption] = useState(false);
  const [isSettingsOpen, setSettings] = useState(false);
  const [selectedModal, setselectedModal] = useState(null);
  const location = useLocation();
  const { mutate: deleteAccount, isPending ,isSuccess} = useDelteAccount();
  let id = "";
  if (auth) id = Extract(auth, "nameid");
  console.log(id);
  const style = location.pathname.includes("track-details") && {
    backgroundColor: "transparent",
    boxShadow: "none",
    position: "static",
  };
  console.log(style);
  // Array of navigation links
  const navLinks = [
    { name: "HOME", to: "/" },
    { name: "OUR TRACKS", to: "/our-tracks" },
    { name: "OUR TEAMS", to: "/our-experts" },
    { name: "DASHBOARD", to: "/my-tracks" },
  ];

  return (
    <nav
      className={` bg-white  shadow-sm w-full  top-[1%]  text-sm  z-30 absolute  mx-[1%] lg:w-[98%] sticky rounded-xl  min-h-18 `}
      style={style ? style : {}}
    >
      <div className="container mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-[#003F7DDE]"
              style={style ? { color: "white" } : {}}
            >
              Ratify
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex space-x-8 ">
            {navLinks.map((link, index) => (
              <NavLinks key={index} to={link.to} name={link.name} />
            ))}
            <HashLink
              to="/#contact"
              className="text-gray-700 hover:text-[#3B82F6] transition duration-300"
            >
              {" "}
              CONTACT US
            </HashLink>
          </div>

          {/* Action Buttons (Desktop) */}
          {auth ? (
            <div className="relative hidden lg:block">
              <div
                onClick={() => setviewOption(!viewOption)}
                className={`w-10 h-10 rounded-full cursor-pointer bg-[var(--main-color)] text-white flex items-center justify-center text-lg font-medium ${
                  viewOption && "border-3 border-[#EBEBEB]"
                }`}
              >
                A
              </div>
              {viewOption && (
                <div className="absolute right-0 mt-.5 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    onClick={() => setSettings(!isSettingsOpen)}
                    className="flex items-center cursor-pointer justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center  text-gray-800">
                      <FaCog className="w-4 h-4 mr-2 " />
                      <span className=" text-[15px]">Settings</span>
                    </div>
                    {isSettingsOpen ? (
                      <FaArrowDown className="w-3 h-3 text-gray-800" />
                    ) : (
                      <FaArrowRight className="w-3 h-3 text-gray-800" />
                    )}
                  </button>
                  {isSettingsOpen && (
                    <div className="pl-4 py-1 border-t border-gray-100 text-[12px]">
                      <button
                        onClick={() => {
                          setviewOption(!viewOption);
                          setSettings(!isSettingsOpen);
                          setselectedModal("email");
                        }}
                        className="flex w-full cursor-pointer gap-1.5 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <MdEmail className="w-4 h-4 text-gray-600" /> Change
                        Email
                      </button>
                      <button
                        onClick={() => {
                          setviewOption(!viewOption);
                          setSettings(!isSettingsOpen);
                          setselectedModal("password");
                        }}
                        className="flex  cursor-pointer items-center gap-1.5 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <MdPassword className="w-4 h-4 text-gray-600" /> Change
                        Password
                      </button>
                      <button
                        onClick={() => {
                          setviewOption(!viewOption);
                          setSettings(!isSettingsOpen);
                          setselectedModal("deleteAccount");
                        }}
                        className="flex  cursor-pointer items-center gap-1.5 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <MdDelete className="w-4 h-4 text-gray-600" /> Delete
                        Account
                      </button>
                    </div>
                  )}
                  <button
                    className="flex cursor-pointer items-center gap-1.5 w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => logout()}
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    <span className="text-[15px]">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center text-md  font-bold space-x-4">
              <Link
                style={style ? { border: "2px solid #fff", color: "#fff" } : {}}
                to="/login"
                className="border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-center px-4 py-2 rounded-xl hover:bg-[#3B82F6] hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                style={style ? { backgroundColor: "#fff", color: "black" } : {}}
                to="/signup"
                className="bg-[#3B82F6] text-white   px-4 py-2 rounded-xl hover:bg-[#003F7DDE] transition duration-300"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4 mt-4 pb-4 ">
              {navLinks.map((link, index) => (
                <NavLinks key={index} to={link.to} name={link.name} />
              ))}
              <HashLink
                to="/#contact"
                className="text-gray-700 hover:text-[#3B82F6] transition duration-300"
              >
                {" "}
                CONTACT US
              </HashLink>
              {auth ? (
                <button
                  onClick={() => logout()}
                  className="cursor-pointer rounded-xl px-4 py-2 font-medium bg-[#3B82F6] hover:bg-[#003F7DDE] transition duration-300 text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    style={
                      style ? { border: "2px solid #fff", color: "#fff" } : {}
                    }
                    to="login"
                    className="border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-center px-4 py-2 rounded-xl hover:bg-[#3B82F6] hover:text-white transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    style={
                      style ? { backgroundColor: "#fff", color: "black" } : {}
                    }
                    to="signup"
                    className="bg-[#3B82F6] text-white font-bold  text-center px-4 py-2 rounded-xl hover:bg-[#003F7DDE] transition duration-300"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedModal == "email" && (
        <Modal >
          <EmailChangeModal setselectedModal={setselectedModal} setShowEmailModal={() => setselectedModal(null)} />
        </Modal>
      )}
      {selectedModal == "password" && (
        <Modal >
          <PasswordChangeModal
            setselectedModal={setselectedModal}
            setShowPasswordModal={() => setselectedModal(null)}
          />
        </Modal>
      )}
      {selectedModal == "deleteAccount" && (
        <Modal setselectedModal={setselectedModal}>
          <ConfirmationModal
           setselectedModal={setselectedModal}
            view={true}
            Cancle={() => setselectedModal(null)}
            Confirm={() => deleteAccount(id)}
            isPending={isPending}
            isSuccess={isSuccess}
          >
            Are you sure you want to delete your account?
          </ConfirmationModal>
        </Modal>
      )}
    </nav>
  );
}

function NavLinks({ to, name }) {
  return (
    <NavLink
      end
      style={
        location.pathname.includes("track-details") ? { color: "white" } : {}
      }
      to={to}
      className={({ isActive }) =>
        isActive
          ? " text-[#3B82F6]   transition duration-300"
          : "text-gray-700 hover:text-[#3B82F6] transition duration-300"
      }
    >
      {name}
    </NavLink>
  );
}

export default Navbar;
