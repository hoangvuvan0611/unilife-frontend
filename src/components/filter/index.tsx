'use client';

import { useState } from 'react';
import { Filter as FilterIcon } from 'lucide-react';
import PriceRange from '@/components/filter/price-range';
import CategoryFilter from '@/components/filter/category';
import StatusFilter from '@/components/filter/status';
import ViewTypeSelector from '@/components/filter/view-type';
import SortSelector from '@/components/filter/sort';

export type ViewType = 'grid' | 'list' | 'compact' | 'map';
export type SortType = 'default' | 'newest' | 'price-asc' | 'price-desc';

export interface FilterState {
  categories: string[];
  price: [number, number];
  statuses: string[];
}

interface FilterProps {
  onViewChange?: (view: ViewType) => void;
  onSortChange?: (sort: SortType) => void;
  onFilterChange?: (filters: FilterState) => void;
}

export default function Filter({ onViewChange, onSortChange, onFilterChange }: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    price: [25000, 980000],
    statuses: [],
  });

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
    onFilterChange?.(filters);
  };

  // Tính toán số lượng bộ lọc đang được áp dụng
  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.categories.length > 0) count += 1;
    if (activeFilters.price[0] !== 25000 || activeFilters.price[1] !== 980000) count += 1;
    if (activeFilters.statuses.length > 0) count += 1;
    return count;
  };

  return (
    <div className="mt-[20px]">
      <div className="max-w-7xl bg-[#f9f9f9] mx-auto px-4">
        <div className="flex flex-col">
          {/* Header với nút Filter và các điều khiển khác */}
          <div className="flex items-center justify-between py-4">
            {/* Left side - Filter button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md border 
                  transition-all duration-300 ease-in-out
                  text-sm font-bold
                  ${isExpanded 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'hover:border-gray-400'
                  }
                `}
              >
                <FilterIcon size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                <span>Bộ lọc</span>
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Right side - View type and Sort */}
            <div className="flex items-center gap-4">
              <ViewTypeSelector onChange={onViewChange} />
              <SortSelector onChange={onSortChange} />
            </div>
          </div>

          {/* Expandable filter section with smooth height animation */}
          <div 
            className={`
              grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out
              ${isExpanded ? 'grid-rows-[1fr]' : ''}
            `}
          >
            <div className="overflow-hidden">
              <div 
                className={`
                  py-6 space-y-6 border-t
                  transition-all duration-300 ease-in-out
                  ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                `}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CategoryFilter 
                    onChange={(categories: string[]) => 
                      handleFilterChange({ ...activeFilters, categories })}
                  />
                  <PriceRange 
                    value={activeFilters.price}
                    onChange={(price: [number, number]) => 
                      handleFilterChange({ ...activeFilters, price })}
                  />
                  <StatusFilter 
                    onChange={(statuses: string[]) => 
                      handleFilterChange({ ...activeFilters, statuses })}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setActiveFilters({
                        categories: [],
                        price: [25000, 980000],
                        statuses: [],
                      });
                      setIsExpanded(false);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Đặt lại
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    Xong
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 