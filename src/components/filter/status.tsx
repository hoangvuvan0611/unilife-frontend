'use client';

import { useState } from 'react';

interface StatusFilterProps {
  onChange?: (statuses: string[]) => void;
}

const statuses = [
  { id: 'on-sale', label: 'On Sale' },
  { id: 'pho-bien', label: 'Phổ biến' },
  { id: 'con-hang', label: 'Còn hàng' },
  { id: 'dat-truoc', label: 'Đơn hàng đặt trước' },
];

export default function StatusFilter({ onChange }: StatusFilterProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleStatusClick = (statusId: string) => {
    const newSelected = selectedStatuses.includes(statusId)
      ? selectedStatuses.filter(id => id !== statusId)
      : [...selectedStatuses, statusId];
    
    setSelectedStatuses(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-base font-medium mb-2">Tình trạng</h3>
      <div className="flex flex-col gap-2">
        {statuses.map((status) => (
          <div key={status.id} className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status.id)}
                onChange={() => handleStatusClick(status.id)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
              />
              <span>{status.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
} 