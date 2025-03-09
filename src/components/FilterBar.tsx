// src/components/FilterBar.tsx
import React from 'react';

interface FilterBarProps {
  onCategoryFilter: (category: string) => void;
  onPriorityFilter: (priority: number) => void;
  onSearch: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  onCategoryFilter, 
  onPriorityFilter, 
  onSearch 
}) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex-1 flex space-x-2">
        {/* Category Filter */}
        <div className="relative">
          <button className="bg-amber-100 px-3 py-1 rounded text-sm flex items-center">
            By category
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {/* Dropdown would go here */}
        </div>
        
        {/* Priority Filter */}
        <div className="relative">
          <button className="bg-amber-100 px-3 py-1 rounded text-sm flex items-center">
            By priority
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {/* Dropdown would go here */}
        </div>
      </div>
      
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for tasks..."
          className="px-8 py-1 text-sm border rounded bg-amber-50"
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
  );
};

export default FilterBar;