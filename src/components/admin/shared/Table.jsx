import React from "react";
export default function Table({ cols, data, row }) {
  return (
    <div className="rounded-lg border border-[var(--table-border)] ">
      <table className="w-full  bg-[var(--table-header-bg)] shadow-md rounded-lg  ">
        <thead className="text-md text-center">
          <tr className="text-[var(--text-color)] font-bold rounded-lg  border-b border-b-[var(--table-border)]">
            {cols.map((col, index) => (
              <th
                key={index}
                className="py-3 px-1 lg:px-3   whitespace-nowrap  "
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <React.Fragment key={index}>{row(item)}</React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}
