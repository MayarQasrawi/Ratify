
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Pagination = ({ totalPages,setCurrentPage,currentPage }) => {


     return (
          <div className="flex items-center justify-center mt-4 gap-4">
               <button
                    onClick={() => setCurrentPage((currentPage) => Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || !totalPages}
                    className="p-2 text-[var(--text-color)] hover:text-[var(--button-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
               >
                    <FaArrowCircleLeft className="text-lg" />
               </button>

               <span className="text-sm text-[var(--text-color)]">
                    Page <span className="font-bold">{currentPage}</span> of {totalPages}
               </span>

               <button
                    onClick={() => setCurrentPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || !totalPages}
                    className="p-2 text-[var(--text-color)] hover:text-[var(--button-hover)] disabled:opacity-30 disabled:cursor-not-allowed"
               >
                    <FaArrowCircleRight className="text-lg" />
               </button>
          </div>
     );
};

export default Pagination;