import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Accordion({ skill, ind }) {
  const [selected, setSelected] = useState(null);
  const handeleSelect = (id) => {
    setSelected(id);
  };
  return (
    <div className="">
      <div className={`flex justify-between items-center ${selected==ind?'border-0':'border-b border-gray-200'} `}>
        <h3 className="py-3 text-[#191919] font-medium">{skill.skill}</h3>
        {selected==ind ? (
          <FiChevronUp className="cursor-pointer text-[#191919] font-medium text-[18px] hover:text-[var(--main-color)]" onClick={()=>setSelected(null)} />
        ) : (
          <FiChevronDown
            onClick={() => handeleSelect(ind)}
            className="cursor-pointer text-[18px] text-[#191919] font-medium  hover:text-[var(--main-color)]"
          />
        )}
      </div>
      {selected == ind && (
        <div className="my-2 pl-3">
          <p>{skill.description}</p>
        </div>
      )}
    </div>
  );
}
