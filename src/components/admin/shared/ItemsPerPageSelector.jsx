import React from 'react';

const ItemsPerPageSelector = ({ options, selectedValue, onChange }) => {
     return (
          <div className="items-per-page-selector">
               <label htmlFor="items-per-page" className='font-semibold'>Items per page:</label>
               <select
                    id="items-per-page"
                    value={selectedValue}
                    onChange={(e) => onChange(Number(e.target.value))}
               >
                    {options.map((option) => (
                         <option key={option} value={option} className='p-2 text-center'>
                              {option}
                         </option>
                    ))}
               </select>
          </div>
     );
};

export default ItemsPerPageSelector;