'use client';

import { Grid2X2, List, LayoutGrid, Map } from 'lucide-react';
import { ViewType } from '.';

interface ViewTypeSelectorProps {
  onChange?: (view: ViewType) => void;
}

const viewTypes = [
  { id: 'grid' as const, icon: Grid2X2, label: 'Lưới' },
  { id: 'list' as const, icon: List, label: 'Danh sách' },
  { id: 'compact' as const, icon: LayoutGrid, label: 'Thu gọn' },
  { id: 'map' as const, icon: Map, label: 'Bản đồ' },
];

export default function ViewTypeSelector({ onChange }: ViewTypeSelectorProps) {
  return (
    <div className="flex items-center border rounded-lg divide-x">
      {viewTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onChange?.(type.id)}
          className="p-2 hover:bg-gray-100 first:rounded-l-lg last:rounded-r-lg"
          title={type.label}
        >
          <type.icon size={20} />
        </button>
      ))}
    </div>
  );
} 