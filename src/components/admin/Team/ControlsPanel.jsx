import { FiFilter } from "react-icons/fi";

const ControlsPanel = ({
  title,
  subtitle,
  viewMode,
  onViewModeChange,
  searchComponent,
  addComponent,
  filtersComponent,
  itemsPerPageComponent,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          {/* Left: Icon + Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiFilter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right: Toggle View Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewModeChange(viewMode === "cards" ? "table" : "cards")}
              className="px-4 py-2 bg-gradient-to-br from-[var(--main-color)] to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {viewMode === "cards" ? "Table View" : "Card View"}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Top Row: Search + Add */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex-1 min-w-64">{searchComponent}</div>
          <div className="flex gap-2">{addComponent}</div>
        </div>

        {/* Bottom Row: Filters + Items per Page */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">{filtersComponent}</div>
          {itemsPerPageComponent}
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;
