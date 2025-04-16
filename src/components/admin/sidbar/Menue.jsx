import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineCollection,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineCheckCircle,
  HiOutlinePlusCircle,
  HiOutlineCog,
  HiUsers 
} from "react-icons/hi";
import { MdOutlineHome } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { RiTeamFill,RiTeamLine  } from "react-icons/ri";
import { MdOutlineDashboardCustomize,MdDashboardCustomize } from "react-icons/md";




const menue = [
  {
    title: "Dashboard",
    icon: <MdOutlineHome />,
    active:<MdHome />,
    link: "",
    visible: ["Admin", "SeniorExaminer", "Examiner"],
  },
  {
    title: "Manage Teams",
    icon: <RiTeamLine />,
    link: "teams",
    active:<RiTeamFill/>,
    visible: ["Admin"],
  },
  {
    title: "Applicants",
    icon: <HiOutlineUsers />,
    active:<HiUsers  />,
    link: "applicants",
    visible: ["Admin"],
  },
  {
    title: "Manage Tracks",
    icon: <MdOutlineDashboardCustomize />,
    active:<MdDashboardCustomize/>,
    link: "tracks",
    visible: ["Admin"],
  },
  {
    title: "Define Plan",
    icon: <HiOutlineUserGroup />,
    link: "tracks",
    visible: ["SeniorExaminer"],
  },
  {
    title: "Examiners",
    icon: <HiOutlineUsers />,
    link: "examiners",
    visible: ["SeniorExaminer"],
  },
  {
    title: "Appointments",
    icon: <HiOutlineCalendar />,
    link: "examiners",
    visible: ["SeniorExaminer"],
  },
  {
    title: "Exam Requests",
    icon: <HiOutlineDocumentText />,
    link: "exams",
    visible: ["SeniorExaminer"],
  },
  {
    title: "Task Repo",
    icon: <HiOutlineFolder className="w-4"/>,
    link: "tasks",
    visible: ["SeniorExaminer"],
  },
  {
    title: "Pending Evaluations",
    icon: <HiOutlineCheckCircle />,
    link: "evaluation",
    visible: ["Examiner"],
  },
  {
    title: "Add Task",
    icon: <HiOutlinePlusCircle />,
    link: "tasks",
    visible: ["Examiner"],
  },
  {
    title: "Setting",
    icon: <HiOutlineCog />,
    link: "setting",
    visible: ["SeniorExaminer", "Examiner"],
  }
 
];

export default menue;
