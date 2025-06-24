export default function StudyCard({ title, description, onClick, icon, loading, study }) {
  console.log(onClick, title, 'title title title');
  
  // Determine card styling based on title and state
  const getCardStyle = () => {
    if (title === 'Material' && study) {
      return 'bg-green-50 border-2 border-green-200';
    }
    return 'bg-white border border-gray-200';
  };
  
  const getButtonStyle = () => {
    if (loading) {
      return 'cursor-not-allowed text-gray-500 bg-gray-300';
    }
    
    if (title === 'Material' && study) {
      return 'bg-green-500 cursor-pointer text-white hover:bg-green-600 transition-all';
    }
    
    return 'bg-blue-500 cursor-pointer text-white hover:bg-blue-600 transition-all';
  };
  
  const getButtonText = () => {
    if (title === 'Material' && loading) {
      return 'Generating';
    }
    if (title === 'Material' && study) {
      return 'Done';
    }
    return 'Generate';
  };

  return (
    <div className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} ${getCardStyle()} rounded-lg p-4 flex flex-col items-center text-center shadow hover:shadow-md transition-all duration-300`}>  
      {icon}
      <h3 className='font-bold text-lg mb-2  text-gray-900'>
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button
        onClick={onClick}
        className={`${getButtonStyle()} px-4 py-2 font-bold rounded text-sm`}
      >
        {getButtonText()}
      </button>
    </div>
  );
}