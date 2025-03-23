'use client';

import { useState, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface PriceRangeProps {
  value: [number, number];
  onChange?: (value: [number, number]) => void;
}

export default function PriceRange({ value, onChange }: PriceRangeProps) {
  const [range, setRange] = useState(value);

  useEffect(() => {
    setRange(value);
  }, [value]);

  const handleChange = (newValue: number[]) => {
    const newRange: [number, number] = [newValue[0], newValue[1]];
    setRange(newRange);
    onChange?.(newRange);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col min-w-[300px]">
      <h3 className="text-base font-medium mb-2">Giá</h3>
      <div className="px-2">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={range}
          min={25000}
          max={980000}
          step={1000}
          onValueChange={handleChange}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-50 focus:outline-none"
            aria-label="Giá thấp nhất"
          />
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-50 focus:outline-none"
            aria-label="Giá cao nhất"
          />
        </Slider.Root>
      </div>
      <div className="flex justify-between mt-2 px-2 text-sm">
        <span>{formatPrice(range[0])}</span>
        <span>–</span>
        <span>{formatPrice(range[1])}</span>
      </div>
    </div>
  );
} 