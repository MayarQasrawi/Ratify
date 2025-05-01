import { MdOutlinePushPin } from "react-icons/md";

export default function Button({px='12',py='4',showModal}) {
  const style={
    padding:`${py}px ${px}px`
  }
  return (
    <button onClick={()=>showModal()} style={style}  className={`inline-block cursor-pointer bg-blue-500 text-white text-sm  font-medium rounded-3xl hover:bg-[#2A5C8A]`}>
    <MdOutlinePushPin  className='inline text-lg'/> Enroll Now
    </button>
  )
}
