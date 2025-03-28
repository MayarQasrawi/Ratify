import img from '../../../../assets/img/tracks/frontEnd.png'
import Navbar from '../../shared/Navbar'
export default function Header() {
  return (
    <header className='bg-[#003F7D] md:hidden lg:block pt-5 pb-10 h-[60vh] rounded-bl-[60px] rounded-br-[60px]'>
      <Navbar />
      <div className='flex h-full gap-10 items-center justify-center'>
        <div>
          <img src={img} className='w-[180px]'/>
        </div>
        <div>
          <h1 className='font-medium text-4xl text-[#3B82F6]'>Front-End <br /> <span className='text-white'>Development</span></h1>
        </div>
      </div>
    </header>
  )
}
