
export default function FlashCard({ card, flipped, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="w-full h-64 md:h-80 lg:h-96 cursor-pointer [perspective:1000px]"
    >
      <div
        className={
          `relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] ` +
          (flipped ? 'rotate-y-180' : '')
        }
      >
        <div
          className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center [backface-visibility:hidden]"
        >
          <div className="text-xl md:text-2xl font-semibold text-center">
            {card.term}
          </div>
          <div className="mt-2 text-sm text-gray-500">Tap to reveal</div>
        </div>
        <div
          className="absolute w-full h-full bg-blue-50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180 [backface-visibility:hidden]"
        >
          <div className="text-base md:text-lg text-gray-700 text-center overflow-auto">
            {card.definition}
          </div>
          <div className="mt-2 text-sm text-gray-500">Tap to hide</div>
        </div>
      </div>
    </div>
  );
}
