import React from 'react'

export default function QuizNavigation({ onNext, isLastQuestion, isAnswered }) {
    return (
        <div className="w-full flex justify-end">
          <button
            onClick={onNext}
            disabled={!isAnswered}
            className={`py-2 px-6 rounded-lg font-semibold ${
              !isAnswered 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
            } transition duration-200`}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
          </button>
        </div>)
}
