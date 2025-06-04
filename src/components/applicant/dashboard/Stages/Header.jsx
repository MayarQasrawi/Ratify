export default function Header({header ,className}) {
     return (
       <header className={`bg-blue-600/10 text-[var(--main-color)] w-[96%]  text-center mx-auto my-2 font-bold rounded-lg py-4 mt-8  text-3xl ${className}`}>
        {header}
       </header>
     )
   }