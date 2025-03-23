'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import CategoryFilter from './category';
import PriceRange from './price-range';
import StatusFilter from './status';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: {
    categories: string[];
    price: [number, number];
    statuses: string[];
  }) => void;
}

export default function FilterDrawer({ isOpen, onClose, onFilterChange }: FilterDrawerProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([25000, 980000]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleApplyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      price: priceRange,
      statuses: selectedStatuses,
    });
    onClose();
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleStatusChange = (statuses: string[]) => {
    setSelectedStatuses(statuses);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full sm:w-[400px] bg-white z-50 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Bộ lọc</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <CategoryFilter onChange={handleCategoryChange} />
            <PriceRange value={priceRange} onChange={handlePriceChange} />
            <StatusFilter onChange={handleStatusChange} />
          </div>

          {/* Footer */}
          <div className="border-t p-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 