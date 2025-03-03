
export default function DashboredTitle({children}) {
  return (
    <section >
        <div className="flex items-center space-x-2">
      <span className="text-[20px] font-semibold text-[#3B82F6]" style={{fontFamily:'Poppins'}}>{children}</span>
    </div>
    </section>
  )
}

