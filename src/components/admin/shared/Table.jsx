export default function Table({ cols, data, row }) {
  return (
      <table className="w-full  bg-[var(--table-header-bg)] shadow-md rounded-lg">
        <thead className="text-md">
          <tr className="text-[var(--text-color)] font-bold rounded-lg  border border-[var(--table-border)]">
            {cols.map((col, index) => (
              <th key={index} className="p-3 text-left whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => row(item))}</tbody>
      </table>
  );
}
