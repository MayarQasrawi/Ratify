import React from 'react'
import { FaSadTear } from 'react-icons/fa'

export default function NoResultFound({text}) {
  return (
     <div className="flex flex-col gap-3 items-center justify-center h-[50vh]">
                <FaSadTear className="mx-auto  text-4xl text-blue-500" />
                <p className="text-lg text-gray-900 capitalize">No {text} Found...</p>
                <p className="text-sm">Try searching for a different {text}.</p>
              </div>
  )
}
