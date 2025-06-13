import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { RiEyeFill, RiEyeCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import IconActionButton from '@/components/Button/IconActionButton'; // تأكد من المسار الصحيح

const MemberCard = ({
  member,
  baseUrl = '',
  hoveredMemberId,
  onHover,
  onWorkloadClick,
  viewDetailsPath,
  currentPage
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
      <div className="bg-gradient-to-br from-[var(--main-color)] via-purple-600 to-purple-600 h-20 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <div className="w-16 h-16 bg-[var(--sidebar-icon-bg)]  rounded-full flex items-center  justify-center shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300">
            {member.image && member.image !== "null" ? (
              <img
                src={`${baseUrl}../${member.image}`}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/default-profile.jpeg";
                }}
              />
            ) : (
              <span className="text-lg font-bold text-[var(--main-color)] ">
                {member.fullName?.split(' ')[0]?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-12 pb-6 px-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{member.fullName}</h3>
        <p className="text-sm text-gray-600 mb-3">{member.email}</p>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
              member.userType !== "SeniorExaminer"
                ? "bg-[var(--main-color)] text-white"
                : "bg-gradient-to-br from-[var(--main-color)] via-purple-600 to-purple-600 text-white"
            }`}
          >
            {member.userType === "SeniorExaminer" ? "Senior Examiner" : "Examiner"}
          </span>
          <span className="text-sm text-gray-600">{member.specialization}</span>
        </div>

        <div className="flex items-center justify-between">
          <IconActionButton
          Icon={IoSearch}
          color='purple'
            onClick={() => onWorkloadClick(member)}
          >
            
            <span>Workload</span>
          </IconActionButton>

          <Link
            to={viewDetailsPath}
            state={{ member, page: currentPage }}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
          >
            <IconActionButton
              Icon={
                hoveredMemberId === member.id
                  ? RiEyeCloseLine
                  : RiEyeFill
              }
              ariaLabel="View Member Details"
              color="blue"
              className="ml-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
