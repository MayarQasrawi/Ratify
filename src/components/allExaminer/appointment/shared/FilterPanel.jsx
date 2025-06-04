import IconActionButton from '@/components/Button/IconActionButton';

export default function FilterPanel({ filters, setFilters }) {
  const statusOptions = [
    { value: 'all', label: 'All', color: 'blue' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'approved', label: 'Approved', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
  ];

  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--table-border)] ">
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-color)] mb-2">Status</label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(({ value, label, color }) => (
            <IconActionButton
              key={value}
              onClick={() => setFilters({ ...filters, status: value })}
              color={filters.status === value ? color  : 'gray'}
              label={label}
              ariaLabel={`Filter by status: ${label}`}
             
               
             
            />
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-color)] mb-2">Date</label>
        <div className="flex flex-wrap gap-2">
          {dateOptions.map(({ value, label }) => (
            <IconActionButton
              key={value}
              onClick={() => setFilters({ ...filters, date: value })}
              color={filters.date === value ? 'blue' : 'gray'}
              label={label}
              ariaLabel={`Filter by date: ${label}`}
            
            />
          ))}
        </div>
      </div>
    </div>
  );
}
