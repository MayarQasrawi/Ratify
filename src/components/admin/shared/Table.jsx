
export default function Table({cols,data,row}) {
  return (
    <table className='w-full bg-white shadow-md  rounded-lg '>
    <thead className="bg-[#FCFCFD] text-[16px]">
      <tr className="text-[#101828] border border-[#EAECF0]">
        {cols.map((col, index) => (
          <th key={index} className="p-3 text-left ">
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map((item) => row(item))}</tbody>
  </table>
  )
}

