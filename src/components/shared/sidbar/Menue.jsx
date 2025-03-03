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
  HiOutlineLogout,
} from "react-icons/hi";

const menue = [
  {
    title: "Dashboard",
    icon: <HiOutlineViewGrid  />,
    link: "",
    visible: ["admin", "seniorExaminer", "examiner"],
  },
  { title: "Team", icon: <HiOutlineUsers />, link: "teams", visible: ["admin"] },
  {
    title: "Track",
    icon: <HiOutlineCollection />,
    link: "tracks",
    visible: ["admin"],
  },
  {
    title: "Track Management",
    icon: <HiOutlineUserGroup />,
    link: "tracks",
    visible: ["seniorExaminer"],
  },
  {
    title: "Examiners",
    icon: <HiOutlineUsers />,
    link: "examiners",
    visible: ["seniorExaminer"],
  },
  {
    title: "Appointments",
    icon: <HiOutlineCalendar />,
    link: "examiners",
    visible: ["seniorExaminer"],
  },
  {
    title: "Exam Requests",
    icon: <HiOutlineDocumentText />,
    link: "exams",
    visible: ["seniorExaminer"],
  },
  {
    title: "Task Repo",
    icon: <HiOutlineFolder className="w-4"/>,
    link: "tasks",
    visible: ["seniorExaminer"],
  },
  {
    title: "Pending Evaluations",
    icon: <HiOutlineCheckCircle />,
    link: "evaluation",
    visible: ["examiner"],
  },
  {
    title: "Add Task",
    icon: <HiOutlinePlusCircle />,
    link: "tasks",
    visible: ["examiner"],
  },
  {
    title: "Setting",
    icon: <HiOutlineCog />,
    link: "setting",
    visible: ["seniorExaminer", "examiner"],
  },
  {
    title: "Logout",
    icon: <HiOutlineLogout />,
    link: "/auth/signin",
    visible: ["admin", "seniorExaminer", "examiner"],
  },
];

export default menue;
