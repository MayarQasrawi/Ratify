import { FaBriefcase, FaRocket } from "react-icons/fa"
import Button from "./shared/Button"

export default function Register() {
  return (
    <section className="mt-20 w-[90%] mx-auto py-14 px-5 bg-[#003F7D] rounded-2xl">
      <div className="flex flex-wrap justify-center items-center">
        <div className="text-white w-[60%] text-2xl font-medium ">
        <p className='w-[90%]'>Want to know more about the Tracks?</p>
      </div>
        <div>
           <Button py='2' />
        </div>

      </div>
    </section>
  )
}
