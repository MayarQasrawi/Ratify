import React from "react";

export default function Title({ children }) {
  return (
    <h3 className="text-[22px] text-[var(--main-color)] dark:text-white font-semibold">
      {children}
    </h3>
  );
}
