import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Accordion({ name, ind ,description}) {
  const [selected, setSelected] = useState(null);
  const handeleSelect = (id) => {
    setSelected(id);
  };
  return (
    <div >
      <div className={`flex justify-between items-center ${selected==ind?'border-0':'border-b border-gray-200'} `}>
        <h3 className="py-3 text-[#191919] font-medium text-md">{name}</h3>
        {selected==ind ? (
          <FiChevronUp className="cursor-pointer dark:text-white text-[#191919] font-medium text-[18px] hover:text-[var(--main-color)]" onClick={()=>setSelected(null)} />
        ) : (
          <FiChevronDown
            onClick={() => handeleSelect(ind)}
            className="cursor-pointer text-[18px] dark:text-white text-[#191919] font-medium  hover:text-[var(--main-color)]"
          />
        )}
      </div>
       {selected == ind && (
        <div className="my-2 pl-3">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
