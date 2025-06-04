export default function Pagination({ totalPage, setCurrentPage, currentPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {Array.from({ length: totalPage }, (_, i) => {
        const page = i + 1;
        return (
          <button
            disabled={page == currentPage}
            key={page}
            onClick={() => {
              setCurrentPage(page);
              console.log(page);
              scrollTo(0, 0);
            }}
            className={`w-8 h-8 cursor-pointer rounded-lg text-sm font-medium  disabled:cursor-not-allowed
              flex items-center justify-center
              ${
                currentPage === page
                  ? "bg-[var(--main-color)] text-white"
                  : "border border-[var(--main-color)] text-[var(--main-color)] hover:bg-blue-50"
              }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
