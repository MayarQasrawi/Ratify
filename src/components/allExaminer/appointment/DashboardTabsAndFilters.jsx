import { FaSearch, FaChevronDown } from "react-icons/fa"
import { LuFilter } from "react-icons/lu"
import FilterPanel from "./shared/FilterPanel"

export default function DashboardTabsAndFilters({
  tabs,
  activeTab,
  setActiveTab,
  itemsByTab, // { [tabKey]: array }
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  placeholder = "Search...",
  showFilterPanel = true, // لتخفي/تظهر فلترة حسب الحاجة
}) {
  return (
    <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md mb-6">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === key
                ? "text-[var(--main-color)] border-b-2 border-[var(--main-color)] bg-white dark:bg-[var(--sidebar-bg)]"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {label} ({itemsByTab?.[key]?.length || 0})
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {showFilterPanel && (
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-100 dark:bg-[var(--input-border)] hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
              aria-expanded={showFilters}
            >
              <LuFilter size={18} />
              <span>Filters</span>
              <FaChevronDown
                className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                size={14}
              />
            </button>
          )}
        </div>

        {showFilters && showFilterPanel && (
          <FilterPanel filters={filters} setFilters={setFilters} />
        )}
      </div>
    </div>
  )
}
