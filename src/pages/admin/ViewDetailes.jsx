import { useLocation } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaBirthdayCake, FaUserEdit, FaUserSlash } from "react-icons/fa";
import { GrStatusGood, GrStatusWarning } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
import DeleteModal from "../../components/admin/ViewDetailes/DeleteModal";
import IconActionButton from "../../components/Button/IconActionButton";
import EmailChangeModal from "../../components/shared/modal/EmailChangeModal";
import Modal from "../../components/shared/modal/Modal";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function ViewDetails() {
  const { state } = useLocation();
  const member = state?.member;
 

  if (!member)
    return <div className="p-4 text-red-500">No member data found</div>;

  const infoItems = [
    {
      icon: MdOutlineMail,
      label: "Email",
      value: member.email,
    },
    {
      icon: BsFillPersonFill,
      label: "Name",
      value: member.fullName,
    },
    {
      icon: BsFillPersonFill,
      label: "Specialization",
      value: member.specialization,
    },
    {
      icon: FaUserClock,
      label: "Examiner Loads",
      value: "",
    },
    {
      icon: FaBirthdayCake,
      label: "Date of Birth",
      value: new Date(member.dateOfBirth).toLocaleDateString(),
    },

    {
      icon: FaUserShield,
      label: "Role",
      value: member.userType,
    },
  ];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditeExaminerModal, setShowEditeExaminerModal] = useState(false);

  // const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="p-4  max-w-6xl mx-auto ">
      {/* <button 
  onClick={handleBack}
  className="text-[var(--main-color)] mb-2 px-2 text-right font-medium flex items-center justify-end gap-1 w-full"
>
  <IoIosReturnLeft size={25} />
  Back To Table 
</button>    */}

      <HashLink
        className="text-[var(--main-color)] mb-2 px-2 text-right font-medium flex items-center justify-end gap-1 w-full"
        to={{
          pathname: "/dashboard/admin/teams",
          search: `?page=${state.page}`, // Add page number
          hash: `#${member.id}`, // Hash fragment for scrolling
        }}
        scroll={(el) => {
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "end" });
          }
        }}
      >
        <IoIosReturnLeft size={25} />
        Back To Table
      </HashLink>


      <div className="grid md:grid-cols-3 gap-6 bg-[var(--sidebar-bg)] shadow-md rounded-xl items-center px-6 py-[90px]">
        {/* Profile Section */}
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-32 h-32 md:w-48 md:h-48   rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <BsFillPersonFill className="w-20 h-20 md:w-32 md:h-32 text-gray-100 dark:text-gray-400" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-center">
            {member.fullName}
          </h2>

          <div className="flex gap-3 mt-4">
            <IconActionButton
              onClick={() => setShowEditeExaminerModal(true)}
              color="blue"
              Icon={FaUserEdit}
              label="Edit Email"
              ariaLabel="Edit user Email"
            />

            <IconActionButton
              onClick={() => setShowDeleteModal(true)}
              color="red"
              Icon={FaUserSlash}
              label="Delete Account"
              ariaLabel="Delete user account"
            />
          </div>
        </div>

        {/* General Information */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800  p-6  ">
          <h3 className="text-2xl font-semibold text-[var(--main-color)] mb-6 pb-2 border-b-2 border-[var(--main-color)]">
            General Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infoItems.map((item, index) => (
              <InfoItem
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
                status={item.status}
              />
            ))}
          </div>
        </div>

        {/* Email Change Modal */}
        {showDeleteModal && (
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          />
        )}

        {showEditeExaminerModal && (
          <Modal>
            <EmailChangeModal
              setShowEmailModal={setShowEditeExaminerModal}
              // showEditeExaminerModal={showEditeExaminerModal}
              //   member={member}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-[var(--sidebar-icon-bg)] cursor-pointer rounded-lg text-[var(--main-color)]">
      <Icon className={`w-7 h-7 mt-1 `} />
      <div>
        <p className="text-sm font-medium ">{label}</p>
        <p className="text-gray-700 dark:text-gray-100">{value || "N/A"}</p>
      </div>
    </div>
  );
};
