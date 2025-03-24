'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface RoomCardProps {
  images: string[];
  location: string;
  hostName: string;
  dateRange: string;
  price: number;
  rating: number;
  isSuperHost?: boolean;
}

export default function RoomCard({
  images,
  location,
  hostName,
  dateRange,
  price,
  rating,
}: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
    <div className="max-w-7xl relative flex flex-col space-y-2">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute right-3 top-3 z-10"
        >
          <Heart 
            className={`h-6 w-6 ${isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-white fill-black/40'}`}
          />
        </button>

        {/* Image carousel */}
        <div className="relative h-full">
          <Image
            src={'/images/image.png'}
            alt={`Room in ${location}`}
            fill
            className="object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md hover:bg-white"
                aria-label="Previous image"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md hover:bg-white"
                aria-label="Next image"
              >
                <span className="sr-only">Next</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Room details */}
      <div className="flex justify-between">
        <div className="font-medium">{location}</div>
        <div className="flex items-center gap-1">
          <svg
            viewBox="0 0 32 32"
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          >
            <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
          </svg>
          <span>{rating}</span>
        </div>
      </div>
      <div className="text-gray-500">Chủ nhà: {hostName}</div>
      <div className="text-gray-500">{dateRange}</div>
      <div className="font-medium">
        {formatPrice(price)} <span className="font-normal">/ đêm</span>
      </div>
    </div>
  );
} 