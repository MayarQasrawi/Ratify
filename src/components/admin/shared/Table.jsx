
export default function Table({cols,data,row}) {
  return (
    <table className="mt-8 w-full border-collapse">
    <thead>
      <tr className="border-y-1  border-y-[#BBBBBB] text-gray-900 ">
        {cols.map((col, index) => (
          <th key={index} className="text-left px-4 py-3 font-semibold">
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map((item) => row(item))}</tbody>
  </table>
  )
}

