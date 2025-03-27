import Lottie from 'lottie-react';
import image from '../../../assets/img/animation/admin/Welcome.json';
import { useAuthContext } from '../../../contexts/AuthProvider'
import Extract from '../../../utils/Extract';

export default function Welcome() {
  const {auth}=useAuthContext();
  let name=''
  if(auth)
    name=Extract(auth,'unique_name')
  return (
    <div className="bg-[var(--sidebar-icon-bg)] sm:py-12 py-8 sm:mt-5 md:mt-8 rounded-lg relative">
      <div className="px-4 flex items-center sm:justify-between justify-center">
        <p className="text-[var(--main-color)] font-bold text-[22px] sm:text-[24px] md:text-[26px] lg:text-3xl">
        Welcome back {name.split(' ')[0]},
        </p>
        <Lottie
          animationData={image}
          loop={true}
          autoplay={true}
          className="w-0 md:w-50 absolute right-3 bottom-1 mt-9 sm:w-40"
        />
      </div>
    </div>
  );
}