import React from 'react'

export default function CancelButton({onClose}) {
  return (
     <button
          type="button"
          onClick={onClose}
          className=" border border-gray-300 cursor-pointer hover:bg-gray-200 rounded px-4 py-2"
        >
          Cancel
        </button>
  )
}
