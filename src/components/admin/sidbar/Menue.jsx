import {
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineFolder,
  HiOutlineCheckCircle,
  HiOutlinePlusCircle,
  HiOutlineCog,
  HiUsers,
  HiPlusCircle, 
   HiOutlineClipboardList
} from "react-icons/hi";
import { MdHome, MdWork } from "react-icons/md";
import { RiTeamFill,RiTeamLine  } from "react-icons/ri";
import { MdOutlineDashboardCustomize,MdDashboardCustomize ,MdOutlineHome, MdWorkOutline} from "react-icons/md";
import { FaRegListAlt,FaClipboardList } from "react-icons/fa";
import { FaFolder, FaRegFolder } from "react-icons/fa";


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
    title: "Mange Plan",
    icon: <FaRegListAlt />,
    active:<FaRegListAlt />,
    link: "plan",
    visible: ["SeniorExaminer"],
  },
  {
    title: "Manage Workload",
    icon: <MdWorkOutline />,
    link: "workload-management",
    active:<MdWork />,
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
    icon: < HiOutlineClipboardList/>,
    link: "exams-stages",
     active:<FaClipboardList />,
    visible: ["SeniorExaminer"],
  },
  {
    title: "Task Repo",
    icon: <FaRegFolder  />,
    active:<FaFolder />,
    link: "stage-tasks",
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
    link: "stage-tasks",
    active:<HiPlusCircle  />,
    visible: ["Examiner"],
  },
  {
    title: "Setting",
    icon: <HiOutlineCog />,
    link: "setting",
    visible: [ "Examiner"],
  }
 
];

export default menue;
