"use client"

import { useState } from "react"
import { FaTimes } from "react-icons/fa"

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  confirmButtonClass,
  onConfirm,
  onClose,
}) {

  if (!isOpen) return null

  const handleConfirm = () => {
   
      onConfirm()
    
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
{/* 
          {showTextArea && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{textAreaLabel}</label>
              <textarea
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
                placeholder={textAreaPlaceholder}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>
          )} */}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-white rounded-md transition-colors ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
