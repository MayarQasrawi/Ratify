import React from "react";
export default function Table({ cols, data, row, headerColor="" ,headerTextColor="" }) {
  return (
    <div className="rounded-lg border border-[var(--table-border)] overflow-auto  ">
      <table className="min-w-full  bg-[var(--table-header-bg)] shadow-md rounded-lg  ">
        <thead className="text-md  overflow-hidden ">
          <tr className={`text-[var(--text-color)] ${headerColor}    border-b border-b-[var(--table-border)] `}>
            {cols.map((col, index) => (
              <th
                key={index}
                className={`py-3 px-1 lg:px-3   whitespace-nowrap text-xs text-start  uppercase tracking-wider ${headerTextColor}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >
          {/* {here I add fragmet and key for each row rendered} */}
          {data &&
            data.map((item, index) => (
              <React.Fragment key={index}>{row(item)}</React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}
