export default function StatCard({ title, count, icon: Icon, color, bgColor }) {
  return (
    <div
      className={`${bgColor} rounded-xl p-6 cursor-pointer shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className={`text-3xl font-bold ${color} mt-1`}>{count}</p>
        </div>
        <div
          className={`p-3 rounded-full ${
            color.includes("blue")
              ? "bg-blue-100 dark:bg-blue-900"
              : color.includes("green")
              ? "bg-green-100 dark:bg-green-900"
              : "bg-red-100 dark:bg-red-900"
          }`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}
