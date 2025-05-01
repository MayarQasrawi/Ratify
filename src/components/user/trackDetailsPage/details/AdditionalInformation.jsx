import Title from '../shared/Title'
export default function AdditionalInformation({ countTypes}) {
  return (
    <div className='mt-20 w-[90%] mx-auto'>
       <div className='flex items-center gap-2'>  
            <Title>Additional Information</Title>
            <div className=' sm:w-[50%] lg:w-[70%]  border-t-2 border-[var(--main-color)]'></div>
            </div> 
        <div className='flex flex-wrap justify-center mt-8  gap-10'>
            {Object.entries(countTypes).map(([type, count]) =><div className='bg-[var(--secondary-color)] rounded-full w-[200px] h-[200px] flex justify-center items-center text-white font-medium text-4xl' key={type}><div className='flex flex-col gap-2'><p className='text-center'>{count}</p><span className='text-2xl'>{type}</span></div></div>)}
        </div>
    </div>
  )
}
