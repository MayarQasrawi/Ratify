import React from 'react'

function LoadingStage() {
  return (
    <main className="flex flex-col items-center justify-center p-2 animate-pulse">
        <div className="bg-blue-500/10 w-[96%] mx-4 my-2 rounded-lg py-5 mt-8">
          <div className="h-8 bg-blue-300/30 w-2/3 mx-auto rounded" />
        </div>
        <section className="w-full flex flex-col items-center gap-4 mt-4">
          <div className="bg-gray-200 h-32 w-[96%] rounded-lg" />
          <div className="bg-gray-200 h-24 w-[96%] rounded-lg" />
        </section>
        <div className="w-[96%] mt-10 p-4 bg-gray-200 rounded-lg">
          <div className="h-5 bg-gray-300 w-1/3 mb-3 rounded"></div>
          <div className="h-4 bg-gray-300 w-full rounded"></div>
        </div>
      </main>
  )
}

export default LoadingStage