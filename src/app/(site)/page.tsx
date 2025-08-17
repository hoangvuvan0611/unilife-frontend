'use client';

import RoomCard from "@/components/room/RoomCard";
import RoomCardSkeleton from "@/components/room/RoomCardSkeleton";
import FilterBox, { ViewType, SortType, FilterState } from "@/components/filter";
import { useEffect, useState } from "react";

const rooms = [
  {
    id: 1,
    images: [
      '/images/rooms/room-test.png',
      '/images/rooms/room-test.png',
      '/images/rooms/room-test.png',
    ],
    location: 'Thành phố Hồ Chí Minh, Việt Nam',
    hostName: 'Hạnh',
    dateRange: '21 – 25 tháng 4',
    price: 777830,
    rating: 4.81,
  },
  {
    id: 2,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Thành phố Hồ Chí Minh, Việt Nam',
    hostName: 'Hạnh',
    dateRange: '26 tháng 4 – 1 tháng 5',
    price: 718257,
    rating: 4.95,
  },
  {
    id: 3,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Villetaneuse, Pháp',
    hostName: 'Erika · Nhân viên hỗ trợ của adepas',
    dateRange: '17 – 22 tháng 4',
    price: 1115224,
    rating: 4.87,
  },
  {
    id: 4,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
    {
    id: 5,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
    {
    id: 6,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
  {
    id: 7,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
  {
    id: 8,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
  {
    id: 9,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
  {
    id: 10,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
  {
    id: 11,
    images: [
      '/images/room-test.png',
      '/images/room-test.png',
      '/images/room-test.png',
    ],
    location: 'Kecamatan Denpasar Timur, Indonesia',
    hostName: 'Made',
    dateRange: '1 – 6 tháng 4',
    price: 620572,
    rating: 4.85,
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<typeof rooms>([]);
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [filteredData, setFilteredData] = useState<typeof rooms>([]);

  useEffect(() => {
    // Giả lập loading data
    const timer = setTimeout(() => {
      setData(rooms);
      setFilteredData(rooms);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = data.filter(room => {
      // Lọc theo danh mục (nếu có)
      if (filters.categories.length > 0) {
        // Thêm logic lọc theo danh mục ở đây
        // return filters.categories.includes(room.category);
      }

      // Lọc theo khoảng giá
      const isInPriceRange = room.price >= filters.price[0] && room.price <= filters.price[1];
      if (!isInPriceRange) return false;

      // Lọc theo trạng thái (nếu có)
      if (filters.statuses.length > 0) {
        // Thêm logic lọc theo trạng thái ở đây
        // return filters.statuses.includes(room.status);
      }

      return true;
    });

    setFilteredData(filtered);
  };

  const handleSortChange = (sort: SortType) => {
    const sorted = [...filteredData].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          // Thêm logic sắp xếp theo thời gian ở đây
          return 0;
        default:
          return 0;
      }
    });

    setFilteredData(sorted);
  };

  return (
    <div className="min-h-screen bg-white">
      <FilterBox
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onViewChange={setViewType}
      />
      
      <div className="mx-auto max-w-7xl py-8">
        <div 
          className={`grid gap-6 ${
            viewType === 'list'
              ? 'grid-cols-1'
              : viewType === 'compact'
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          {isLoading ? (
            // Hiển thị skeleton khi đang loading
            Array.from({ length: 8 }).map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))
          ) : filteredData.length > 0 ? (
            // Hiển thị danh sách phòng khi có data
            filteredData.map((room) => (
              <RoomCard
                key={room.id}
                images={room.images}
                location={room.location}
                hostName={room.hostName}
                dateRange={room.dateRange}
                price={room.price}
                rating={room.rating}
              />
            ))
          ) : (
            // Hiển thị thông báo khi không có data
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">Không tìm thấy phòng trọ nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
