import Action from "../../components/admin/shared/Action";
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

const cols = ["Title", "Price"];

export default function AdminTrack() {
  const renderRow = (track) => (
    <tr className="border border-[var(--table-border)] text-sm">
      <td className="p-3 text-[var(--text-color)]">{track.trackName}</td>
      <td className="p-3 text-[var(--text-color)]">{track.price}</td>
      <td className="p-3">
        <Action />
      </td>
    </tr>
  );

  return (
    <div className="pl-4 pt-4 pb-6">
      <Table data={tracks} cols={cols} row={renderRow} />
    </div>
  );
}