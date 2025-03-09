import { MdOutlinePushPin } from "react-icons/md";

export default function Button({px='16',py='1'}) {
  return (
    <button  class={`inline-block cursor-pointer bg-blue-500 text-white text-sm py-${py} px-${px} rounded-3xl hover:bg-[#2A5C8A]`}>
          <MdOutlinePushPin  className='inline text-lg'/> Enroll Now
          </button>
  )
}
