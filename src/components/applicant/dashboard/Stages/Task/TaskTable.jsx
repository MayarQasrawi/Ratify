import { MdCalendarToday, MdEmojiEvents, MdDescription } from 'react-icons/md';

export default function TaskTable({dueDate, difficulty, requirements,title}) {


  return (
    <div className="max-w-md mt-4 ">
      <div className="bg-white rounded-lg  overflow-hidden">
        {/* Header */}
        <div className="p-4 text-white bg-[var(--main-color)]" >
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4   border-3 rounded-b-lg border-t-0 border-[var(--table-border)]">
         
         
          {/* Deadline */}
          <div className="flex items-start gap-3">
            <MdCalendarToday className="mt-1 flex-shrink-0 text-[var(--main-color)]" size={20} />
            <div>
              <p className="font-semibold text-gray-700">Deadline</p>
              <p className="text-gray-600">{new Date(dueDate).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})}
</p>
            </div>
          </div>

          {/* Max Points */}
          <div className="flex items-start gap-3">
            <MdEmojiEvents className="mt-1 flex-shrink-0 text-[var(--main-color)]" size={20} />
            <div>
              <p className="font-semibold text-gray-700">Difficulty</p>
              <p className="text-gray-600">{difficulty}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <MdDescription className="mt-1 flex-shrink-0 text-[var(--main-color)]" size={20} />
            <div>
              <p className="font-semibold text-gray-700">Requirements</p>
              <p className="text-gray-600">{requirements}</p>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}
