import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/user/expertPage/left/Sidebar";
import Expert from "../../components/user/expertPage/right/Expert";
import Title from '../../components/user/shared/Title'
export default function ExpertsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  function mergeQuery(key, val) {
    const current = new URLSearchParams(searchParams);
    if (val == null) {
      current.delete(key);
    } else {
      current.set(key, val);
    }
    setSearchParams(`?${current.toString()}`);
  }
  return (
    <main className="mt-10 w-[90%] mx-auto">
      <div className="text-center">
        <Title first="OUR " last="Teams" />
      </div>
      <div className=" flex flex-col sm:flex-row mt-8 gap-4 ">
        <div className=" w-full sm:w-1/4 min-w-[220px]">
          <Sidebar
            searchParams={searchParams}
            setSearchParams={(key, val) => mergeQuery([key], val)}
          />
        </div>
        <div className="flex-1">
          <Expert
            searchParams={searchParams}
            setSearchParams={(key, val) => mergeQuery([key], val)}
          />
        </div>
      </div>
    </main>
  );
}
