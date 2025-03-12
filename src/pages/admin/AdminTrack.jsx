import DashboredTitle from "../../components/admin/shared/DashboredTitle";
import Table from "../../components/admin/shared/Table";

const tracks = [
  {
    trackName: "Frontend Development",
    price: 150,
    technology: "React",
  },
  {
    trackName: "Backend Development",
    price: 200,
    technology: "Node.js",
  },
  {
    trackName: "Full Stack Development",
    price: 300,
  },
  {
    trackName: "Data Science",
    price: 250,
  },
  {
    trackName: "Cybersecurity",
    price: 180,
  },
];
const cols = ["Title", "Price", "Action"];

export default function AdminTrack() {
  const renderRow = (track) => (
    <tr className="border-b odd:bg-slate-50 even:bg-[#f9f9f9] border-b-[#BBBBBB] hover:bg-[#E7ECFF] text-[#263238] ">
      <td className="px-3 py-3.5">{track.trackName}</td>
      <td className="px-3 py-3.5">{track.price}</td>
      <td className="px-3 py-3.5">action</td>
    </tr>
  );
  return (
    <div className="bg-white pl-4 pt-4 pb-6">
      <DashboredTitle>All Tracks</DashboredTitle>
      <Table data={tracks} cols={cols} row={renderRow} />
    </div>
  );
}
