import { MdAutorenew } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";

export default function Header({title}) {
  return (
    <div className="flex items-center justify-center w-full mb-13">
      <TbUserEdit  className="w-6 h-6 text-gray-500 mr-2" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
}
