
export default function Spinner({color='white'}) {
  const border= color=='white'?'border-white ':`border-${color}`
  return (
    <div className={`w-5 h-5 mx-auto border-2  ${border} border-t-transparent rounded-full animate-spin`}></div>
  )
}
