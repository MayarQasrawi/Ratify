import React from 'react';

function Card({ Icon, title, descriptions, className = '', loading = false }) {
  if (loading) {
    return (
      <article className={`p-5 w-68 backdrop-blur-md bg-white/30 shadow-sm rounded-2xl animate-pulse ${className}`}>
        <header className='flex flex-row gap-4 items-center justify-center mb-6'>
          <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center'></div>
          <div className='h-6 w-32 bg-gray-300 rounded-md'></div>
        </header>
        <div className='h-5 bg-gray-300 rounded-md mx-auto w-40'></div>
      </article>
    );
  }
  

  return (
    <article className={`p-5 w-68 backdrop-blur-md bg-white/30  border-2  items-center justify-center shadow-sm rounded-2xl ${className}`}>
      <header className='flex flex-row gap-4 items-center justify-center mb-6'>
        <div className='w-16 h-16 rounded-full bg-[var(--main-color)] flex items-center justify-center'>
          {Icon && <Icon className="w-8 h-8 text-white" />}
        </div>
        <h2 className='font-bold text-xl text-[var(--secondary-color)]'>
          {title}
        </h2>
      </header>
      <p className='text-[#5F5D5D] text-lg font-medium text-center whitespace-pre-line'>
        {descriptions}
      </p>
    </article>
  );
}

export default Card;
