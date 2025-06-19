
export default function QuizOption({ option, index, isSelected, onSelect }) {
    return (
        <button
          onClick={() => onSelect(index)}
          className={`py-5 pl-3 text-left rounded-lg border-1 transition-all duration-200 ${
            isSelected 
              ? 'border-[#3B82F6] bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <div className="cursor-pointer flex items-center text-sm font-medium">
            <div className={` flex-shrink-0 w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
              isSelected 
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}>
              {index + 1}
            </div>
            <span>{option}</span>
          </div>
        </button>
      );
}
