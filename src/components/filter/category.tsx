'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  onChange?: (categories: string[]) => void;
}

const categories = [
  { id: 'do-kho', label: 'Đồ khô', count: 14 },
  { id: 'do-uong', label: 'Đồ uống', count: 14 },
  { id: 'rau-cu', label: 'Rau củ', count: 14 },
  { id: 'trai-cay', label: 'Trái cây', count: 15 },
];

export default function CategoryFilter({ onChange }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-base font-medium mb-2">Danh mục</h3>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg hover:bg-gray-100 ${
                selectedCategories.includes(category.id) ? 'bg-gray-100' : ''
              }`}
            >
              <span>{category.label}</span>
              <span className="text-sm text-gray-500">{category.count}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 