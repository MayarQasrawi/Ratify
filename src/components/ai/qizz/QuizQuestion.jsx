import React from 'react'
import QuizOption from './QuizOption'

export default function QuizQuestion({questionNumber,totalQuestions,currentQuestion, onAnswerSelect ,selectedAnswer,topic}) {
    return (
        <>
          <div className="w-full flex justify-between items-center mb-6">
          <div className='bg-blue-100 rounded-md text-center p-4 w-full'>
              <h1 className="text-3xl font-bold font-mono text-[#3B82F6]">{topic} Quiz</h1>
          </div>
           
          </div>
          <div className="bg-white w-full p-6 rounded-lg shadow-md border border-blue-50 mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-6">
              {currentQuestion.question}
            </h2>  
            <div className="flex flex-col space-y-3 ">
              {currentQuestion.options.map((option, index) => (
                <QuizOption
                  key={index}
                  option={option}
                  index={index}
                  onSelect={onAnswerSelect}
                  isSelected={selectedAnswer === index}
                />
              ))}
            </div>
          </div>
        </>)
}
