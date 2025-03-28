export default function Table({ cols, data, row }) {
  return (
    <table className="w-full bg-[var(--table-header-bg)]  shadow-md rounded-lg">
      <thead className=" w-full text-[16px] ">
        <tr className="text-[var(--text-color)]  border border-[var(--table-border)]">
          {cols.map((col, index) => (
            <th key={index} className="p-3 text-left">
              {col}
            </th>
       
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => row(item))}</tbody>
    </table>
  );
}