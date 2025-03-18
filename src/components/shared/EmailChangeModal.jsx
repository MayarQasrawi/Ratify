import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdCheck, MdClose, MdAutorenew } from "react-icons/md";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import useChangeEmail from "../../hooks/auth/useChangeEmail";
import { useAuthContext } from "../../contexts/AuthProvider";
import Extract from "../../utils/Extract";
import Spinner from "./Spinner";
const emailSchema=z.object({
  email:z.string().email({ message: "Invalid email " })
})
export default function EmailChangeModal({setShowChangeEmailModal}) {
 const {auth}= useAuthContext();
//  const id=Extract(auth,'nameid');
//  console.log(id)
  const { register, handleSubmit, watch,formState:{errors} } = useForm({
    resolver:zodResolver(emailSchema),
    mode:"onChange"
  });
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const {mutate,isPending}=useChangeEmail()
  const watchEmail = watch("email");
  
  const handleEmailChange = ({email}) => {
    mutate({id,newEmail:email})
    console.log({id,newEmail:email});
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-96 border border-gray-200">
      <div className="flex items-center justify-center w-full mb-8">
        <MdAutorenew className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Change Email Address</h2>
      </div>
      {!isConfirming ? (
        <form  className="w-full flex flex-col gap-6">
          <div className="relative">
            <div className={`absolute left-3 flex items-center gap-3 ${isFocused || watchEmail ? 'text-xs text-blue-500 -top-2 bg-white px-1' : 'text-gray-500 top-3'} transition-all duration-200`}>
              <MdEmail className="w-5 h-5 " />
              <span className="text-sm">Email Address</span>
            </div>
            <input
              type="email"
              {...register("email")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none  pt-4"
            />

            {errors.email && <p className="mt-2  pl-3 py-2 bg-red-50 border-l-4 border-red-700 rounded-md text-red-600 font-medium">{errors.email.message}
            </p>}
          </div>
          
          <button 
            onClick={()=>setIsConfirming(true)}
            type="submit" 
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2.5 font-medium"
          >
            <MdEmail className="w-5 h-5" />
            Change Email Address
          </button>
        </form>
      ) : (
        <div className="text-center w-full">
          <p className="text-lg font-medium ">
            Are you sure you want to change your email to <span className="text-[#003F7D] font-semibold underline">{watchEmail}</span>?
          </p>
          <div className="flex mt-9 gap-4 justify-center">
            <button 
              disabled={isPending}
              onClick={handleSubmit(handleEmailChange)} 
              className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
            >
              <MdCheck className="w-5 h-5" />
              {isPending?<Spinner />:'Confirm'}
            </button>
            <button 
              onClick={() =>{setShowChangeEmailModal(false) ;setIsConfirming(false)}} 
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
            >
              <MdClose className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
