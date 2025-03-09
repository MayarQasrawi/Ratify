import { FaSearch } from "react-icons/fa";
export default function Search({ setsearchQuery,setSearchParams }) {
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setsearchQuery(event.target.value)
      if(event.target.value==''){
        setSearchParams('query',null)
      }else{
        setSearchParams('query',event.target.value)
      }
    }
  };
  return (
    <div className="mb-1 hidden sm:block">
      <form onSubmit={(e)=>{e.preventDefault()}} className="bg-[#F1F1F5] w-1/2 min-w-[220px]  flex items-center rounded-sm pl-2">
      <FaSearch size={20} className="text-[#696974]"  />
        <input
          className="w-1/2 py-2 pl-3  min-w-[240px] placeholder:text-[#696974] placeholder:text-[16px] outline-none"
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="search by expert name"
        />
      </form>
    </div>
  );
}
