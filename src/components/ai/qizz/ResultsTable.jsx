import React from 'react'
const col=['No.','Question & Correct Answer','Your Answer']
export default function ResultsTable({ quizData, userAnswers }) {
    return (
        <div className="w-full  mt-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl ">
          <table className="w-full">
            <thead className="bg-white">
              <tr className="border-b border-gray-200 text-[#3B82F6]">
               {col.map((c,ind)=><th key={ind} className="py-3 px-4 text-left font-semibold">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {quizData.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.answerIndex;
                return (
                  <tr
                    key={idx}
                    className={`border-b cursor-pointer hover:bg-gray-100 transition-colors border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4 font-medium">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{q.question}</div>
                      <div className="text-sm text-gray-700">
                        {q.options[q.answerIndex]}
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-md ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {q.options[userAnswers[idx]]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      );
}
