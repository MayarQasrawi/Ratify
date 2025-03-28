import Title from '../../components/user/shared/Title'
import Tracks from '../../components/user/TrackPage/Tracks'

export default function TrackPage() {
  
  return (
    <section className='mt-12'>
       <div className="flex justify-center  text-xl lg:text-4xl  mt-10 md:px-16 items-center">
       <Title first="OUR " last="TRACKS" />
       </div>
      <Tracks />
    </section>
  )
}
