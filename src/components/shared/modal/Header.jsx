import { MdAutorenew } from "react-icons/md";

export default function Header({title}) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      <MdAutorenew  className="w-6 h-6 text-blue-500 mr-2" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
}
