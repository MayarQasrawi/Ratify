import React from 'react';

const LevelMeta = ({ items }) => (
  <div className="flex flex-wrap gap-6 text-sm">
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-[var(--main-color)]">{item.icon}</span>
        <span className="text-gray-500 font-medium">{item.label}</span>
      </div>
    ))}
  </div>
)

export default LevelMeta;
