'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

const rooms = [
  {
    id: 1,
    title: 'Phòng trọ đẹp gần ĐH Bách Khoa',
    price: 2500000,
    area: 25,
    address: '268 Lý Thường Kiệt, P.14, Q.10',
    rating: 4.5,
    status: 'AVAILABLE',
    created_at: '2024-03-20',
    images: ['/images/room-test.png'],
  },
  {
    id: 2,
    title: 'Phòng trọ giá rẻ gần ĐH Kinh Tế',
    price: 1800000,
    area: 20,
    address: '59C Nguyễn Đình Chiểu, P.6, Q.3',
    rating: 4.2,
    status: 'RENTED',
    created_at: '2024-03-19',
    images: ['/images/room-test.png'],
  },
  // Thêm dữ liệu mẫu khác...
];

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý phòng trọ</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Plus size={20} />
          Thêm phòng trọ
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm phòng trọ..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Tất cả trạng thái</option>
          <option value="AVAILABLE">Còn trống</option>
          <option value="RENTED">Đã cho thuê</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Sắp xếp theo</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="rating">Đánh giá</option>
        </select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={room.images[0]}
                alt={room.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium line-clamp-1">{room.title}</h3>
                <span className="text-primary font-semibold">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(room.price)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin size={16} />
                <span className="line-clamp-1">{room.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{room.rating}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  room.status === 'AVAILABLE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {room.status === 'AVAILABLE' ? 'Còn trống' : 'Đã cho thuê'}
                </span>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t">
                <button className="p-2 text-gray-500 hover:text-primary">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Hiển thị 1 đến 6 của 24 kết quả
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            Trước
          </button>
          <button className="px-3 py-1 bg-primary text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            4
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
} 