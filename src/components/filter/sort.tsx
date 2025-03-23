'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SortType } from '.';

interface SortSelectorProps {
  onChange?: (sort: SortType) => void;
}

const sortOptions = [
  { id: 'default', label: 'Mặc định' },
  { id: 'newest', label: 'Mới nhất' },
  { id: 'price-asc', label: 'Giá: Tăng dần' },
  { id: 'price-desc', label: 'Giá: Giảm dần' },
] as const;

export default function SortSelector({ onChange }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SortType>('default');

  const handleSelect = (sort: SortType) => {
    setSelected(sort);
    onChange?.(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:border-gray-400 text-sm font-bold"
      >
        <span>Sắp xếp: {sortOptions.find(opt => opt.id === selected)?.label}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selected === option.id ? 'bg-gray-50' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 