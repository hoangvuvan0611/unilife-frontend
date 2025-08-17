'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="hidden md:flex items-center justify-center max-w-md mx-8">
      <div 
        className={`
          flex items-center rounded-full border shadow-sm 
          transition-all duration-300 ease-in-out
          ${isFocused 
            ? 'shadow-md w-[200px]' 
            : 'hover:shadow-md w-[125px]'
          }
        `}
      >
        <input 
          type="text" 
          placeholder="Tìm kiếm địa điểm..."
          className="px-4 py-1.5 text-sm w-full rounded-l-full focus:outline-none transition-all duration-300 placeholder:font-semibold"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className={`
          p-2 rounded-full transition-all duration-300 ease-in-out transform
          ${isFocused 
            ? 'bg-lime-600 text-white scale-110' 
            : 'bg-lime-500 text-white hover:bg-lime-600 hover:scale-105'
          }
        `}>
          <Search size={16} className="transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
} 