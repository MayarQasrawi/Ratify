import { useForm } from "react-hook-form";
import useChangePassword from "../../hooks/auth/useChangePassword";
import { MdEmail, MdCheck, MdClose, MdAutorenew } from "react-icons/md";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";

export default function PasswordChangeModel() {

   const { register, handleSubmit ,formState:{errors}} = useForm({
   });
   const [isConfirming, setIsConfirming] = useState(false);
   const [isFocused, setIsFocused] = useState(false);
   const {mutate,isPending}=useChangePassword()
   
   const handlePasswordChange = ({newPassword,oldPassword,email}) => {
     mutate({oldPassword,email,newPassword})
     console.log({oldPassword,email,newPassword});
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
                <div className={`absolute left-3 flex items-center gap-3  transition-all duration-200`}>
                  <MdEmail className="w-5 h-5 " />
                  <span className="text-sm">password</span>
                </div>
                <input
                  type="password"
                  {...register("oldPassword")}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none  pt-4"
                />
                  <input
                  type="email"
                  {...register("email")}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none  pt-4"
                />
                 <input
                  type="password"
                  {...register("newPassword")}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none  pt-4"
                />
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
                Are you sure you want to change your password?
              </p>
              <div className="flex mt-9 gap-4 justify-center">
                <button 
                  disabled={isPending}
                  onClick={handleSubmit(handlePasswordChange)} 
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
                >
                  <MdCheck className="w-5 h-5" />
                  {isPending?'Confirm...':'Confirm'}
                </button>
                <button 
                  onClick={() =>{;setIsConfirming(false)}} 
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

