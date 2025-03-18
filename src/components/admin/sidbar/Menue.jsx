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
  HiUserGroup
} from "react-icons/hi";

const menue = [
  {
    title: "Dashboard",
    icon: <HiOutlineViewGrid  />,
    link: "",
    visible: ["Admin", "SeniorExaminer", "Examiner"],
  },
  {
    title: "Team Management",
    icon: <HiUserGroup />,
    link: "teams",
    visible: ["Admin"],
  },
  {
    title: "Track",
    icon: <HiOutlineCollection />,
    link: "tracks",
    visible: ["Admin"],
  },
  {
    title: "Track Management",
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
  },
 
];

export default menue;
