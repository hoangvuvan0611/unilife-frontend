'use client';

import { useState, useRef } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, MapPin, Star, X, Settings, Eye, ArrowUp, ArrowDown, XCircle, Filter, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

interface Room {
  id: number;
  title: string;
  price: number;
  area: number;
  address: string;
  description: string;
  rating: number;
  status: 'AVAILABLE' | 'RENTED';
  created_at: string;
  images: string[];
  utilities: string[];
  location: {
    lat: number;
    lng: number;
  };
  owner: {
    id: number;
    name: string;
    phone: string;
  };
}

interface RoomConfig {
  maxImages: number;
  minImages: number;
  maxPrice: number;
  minPrice: number;
  maxArea: number;
  minArea: number;
  requiredFields: string[];
}

interface ImagePreview {
  id: string;
  file: File;
  preview: string;
}

const defaultConfig: RoomConfig = {
  maxImages: 10,
  minImages: 1,
  maxPrice: 10000000,
  minPrice: 1000000,
  maxArea: 100,
  minArea: 10,
  requiredFields: ['title', 'price', 'area', 'address', 'description', 'images'],
};

const rooms: Room[] = [
  {
    id: 1,
    title: 'Phòng trọ đẹp gần ĐH Bách Khoa',
    price: 2500000,
    area: 25,
    address: '268 Lý Thường Kiệt, P.14, Q.10',
    description: 'Phòng trọ đẹp, thoáng mát, gần trường ĐH Bách Khoa. Có đầy đủ tiện nghi: điều hòa, nóng lạnh, wifi, giường, tủ, bàn học. Có chỗ để xe miễn phí.',
    rating: 4.5,
    status: 'AVAILABLE',
    created_at: '2024-03-20',
    images: ['/images/room-test.png'],
    utilities: ['Điều hòa', 'Nóng lạnh', 'Wifi', 'Giường', 'Tủ', 'Bàn học', 'Chỗ để xe'],
    location: {
      lat: 10.7722,
      lng: 106.6579,
    },
    owner: {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0901234567',
    },
  },
  {
    id: 2,
    title: 'Phòng trọ giá rẻ gần ĐH Kinh Tế',
    price: 1800000,
    area: 20,
    address: '59C Nguyễn Đình Chiểu, P.6, Q.3',
    description: 'Phòng trọ giá rẻ, gần trường ĐH Kinh Tế. Có điều hòa, nóng lạnh, wifi. Có chỗ để xe miễn phí.',
    rating: 4.2,
    status: 'RENTED',
    created_at: '2024-03-19',
    images: ['/images/room-test.png'],
    utilities: ['Điều hòa', 'Nóng lạnh', 'Wifi'],
    location: {
      lat: 10.7722,
      lng: 106.6579,
    },
    owner: {
      id: 2,
      name: 'Nguyễn Văn B',
      phone: '0901234568',
    },
  },
  // Thêm dữ liệu mẫu khác...
];

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [roomConfig, setRoomConfig] = useState<RoomConfig>(defaultConfig);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetailRoom, setSelectedDetailRoom] = useState<Room | null>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    utilities: [] as string[],
    location: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setRoomToDelete(room);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Implement delete logic
    setIsDeleteConfirmOpen(false);
    setRoomToDelete(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));

    setImagePreviews(prev => [...prev, ...newPreviews]);
    validateImages([...imagePreviews, ...newPreviews]);
  };

  const handleRemoveImage = (id: string) => {
    setImagePreviews(prev => {
      const newPreviews = prev.filter(img => img.id !== id);
      validateImages(newPreviews);
      return newPreviews;
    });
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    setImagePreviews(prev => {
      const newPreviews = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newPreviews[index], newPreviews[newIndex]] = [newPreviews[newIndex], newPreviews[index]];
      return newPreviews;
    });
  };

  const validateImages = (previews: ImagePreview[]) => {
    const errors: Record<string, string> = {};
    
    if (previews.length < roomConfig.minImages) {
      errors.images = `Cần tối thiểu ${roomConfig.minImages} ảnh`;
    } else if (previews.length > roomConfig.maxImages) {
      errors.images = `Chỉ được tối đa ${roomConfig.maxImages} ảnh`;
    }

    setValidationErrors(prev => ({ ...prev, images: errors.images }));
  };

  const handleViewDetail = (room: Room) => {
    setSelectedDetailRoom(room);
    setIsDetailOpen(true);
  };

  const handleSubmitRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors: Record<string, string> = {};

    // Validate required fields
    roomConfig.requiredFields.forEach(field => {
      if (!formData.get(field)) {
        errors[field] = 'Trường này là bắt buộc';
      }
    });

    // Validate price range
    const price = Number(formData.get('price'));
    if (price < roomConfig.minPrice || price > roomConfig.maxPrice) {
      errors.price = `Giá phải từ ${roomConfig.minPrice.toLocaleString()} đến ${roomConfig.maxPrice.toLocaleString()} VND`;
    }

    // Validate area range
    const area = Number(formData.get('area'));
    if (area < roomConfig.minArea || area > roomConfig.maxArea) {
      errors.area = `Diện tích phải từ ${roomConfig.minArea} đến ${roomConfig.maxArea} m²`;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const roomData = {
        title: formData.get('title') as string,
        price: Number(formData.get('price')),
        area: Number(formData.get('area')),
        address: formData.get('address') as string,
        description: formData.get('description') as string,
        status: formData.get('status') as 'AVAILABLE' | 'RENTED',
        images: imagePreviews.map(img => img.file),
        utilities: formData.getAll('utilities') as string[],
        location: {
          lat: Number(formData.get('lat')),
          lng: Number(formData.get('lng')),
        },
        owner: {
          id: Number(formData.get('owner_id')),
          name: formData.get('owner_name') as string,
          phone: formData.get('owner_phone') as string,
        },
      };

      try {
        if (selectedRoom) {
          // TODO: Implement update API call
          console.log('Updating room:', roomData);
        } else {
          // TODO: Implement create API call
          console.log('Creating room:', roomData);
        }
        setIsModalOpen(false);
        setImagePreviews([]);
      } catch (error) {
        console.error('Error submitting room:', error);
      }
    }
  };

  const handleConfigSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newConfig: RoomConfig = {
      maxImages: Number(formData.get('maxImages')),
      minImages: Number(formData.get('minImages')),
      maxPrice: Number(formData.get('maxPrice')),
      minPrice: Number(formData.get('minPrice')),
      maxArea: Number(formData.get('maxArea')),
      minArea: Number(formData.get('minArea')),
      requiredFields: formData.getAll('requiredFields') as string[],
    };
    setRoomConfig(newConfig);
    setIsConfigOpen(false);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = 
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || room.status === statusFilter;
    const matchesPrice = 
      (!advancedFilters.minPrice || room.price >= Number(advancedFilters.minPrice)) &&
      (!advancedFilters.maxPrice || room.price <= Number(advancedFilters.maxPrice));
    const matchesArea = 
      (!advancedFilters.minArea || room.area >= Number(advancedFilters.minArea)) &&
      (!advancedFilters.maxArea || room.area <= Number(advancedFilters.maxArea));
    const matchesUtilities = 
      advancedFilters.utilities.length === 0 ||
      advancedFilters.utilities.every(utility => room.utilities.includes(utility));
    const matchesLocation = 
      !advancedFilters.location ||
      room.address.toLowerCase().includes(advancedFilters.location.toLowerCase());

    return matchesSearch && matchesStatus && matchesPrice && matchesArea && matchesUtilities && matchesLocation;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'area_asc':
        return a.area - b.area;
      case 'area_desc':
        return b.area - a.area;
      case 'rating':
        return b.rating - a.rating;
      case 'date_asc':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'date_desc':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);
  const paginatedRooms = sortedRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý phòng trọ</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsConfigOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings size={20} />
            Cấu hình
          </button>
          <button 
            onClick={handleAddRoom}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            <Plus size={20} />
            Thêm phòng trọ
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
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
          <button
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal size={20} />
            Tìm kiếm nâng cao
          </button>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="AVAILABLE">Còn trống</option>
            <option value="RENTED">Đã cho thuê</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sắp xếp theo</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
            <option value="area_asc">Diện tích tăng dần</option>
            <option value="area_desc">Diện tích giảm dần</option>
            <option value="rating">Đánh giá</option>
            <option value="date_asc">Ngày đăng cũ nhất</option>
            <option value="date_desc">Ngày đăng mới nhất</option>
          </select>
        </div>

        {/* Advanced Search */}
        {isAdvancedSearchOpen && (
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá tối thiểu (VND)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={advancedFilters.minPrice}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá tối đa (VND)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={advancedFilters.maxPrice}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diện tích tối thiểu (m²)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={advancedFilters.minArea}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minArea: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diện tích tối đa (m²)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={advancedFilters.maxArea}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxArea: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiện ích
              </label>
              <div className="flex flex-wrap gap-2">
                {['Điều hòa', 'Nóng lạnh', 'Wifi', 'Giường', 'Tủ', 'Bàn học', 'Chỗ để xe'].map(utility => (
                  <label key={utility} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={advancedFilters.utilities.includes(utility)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAdvancedFilters(prev => ({
                            ...prev,
                            utilities: [...prev.utilities, utility]
                          }));
                        } else {
                          setAdvancedFilters(prev => ({
                            ...prev,
                            utilities: prev.utilities.filter(u => u !== utility)
                          }));
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{utility}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khu vực
              </label>
              <input
                type="text"
                placeholder="Nhập địa chỉ..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={advancedFilters.location}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRooms.map((room) => (
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
                <button 
                  onClick={() => handleViewDetail(room)}
                  className="p-2 text-gray-500 hover:text-primary"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => handleEditRoom(room)}
                  className="p-2 text-gray-500 hover:text-primary"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room)}
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, sortedRooms.length)} của {sortedRooms.length} kết quả
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page 
                  ? 'bg-primary text-white' 
                  : 'border hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Room Detail Modal */}
      <Dialog open={isDetailOpen} onClose={() => setIsDetailOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-xl font-semibold">
                Chi tiết phòng trọ
              </Dialog.Title>
              <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            {selectedDetailRoom && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-2">{selectedDetailRoom.title}</h3>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src={selectedDetailRoom.images[0]}
                        alt={selectedDetailRoom.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Thông tin cơ bản</h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Giá thuê:</span>{' '}
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(selectedDetailRoom.price)}
                      </p>
                      <p>
                        <span className="font-medium">Diện tích:</span>{' '}
                        {selectedDetailRoom.area} m²
                      </p>
                      <p>
                        <span className="font-medium">Địa chỉ:</span>{' '}
                        {selectedDetailRoom.address}
                      </p>
                      <p>
                        <span className="font-medium">Trạng thái:</span>{' '}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDetailRoom.status === 'AVAILABLE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedDetailRoom.status === 'AVAILABLE' ? 'Còn trống' : 'Đã cho thuê'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tiện ích</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDetailRoom.utilities.map((utility, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {utility}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Thông tin chủ nhà</h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Tên:</span>{' '}
                        {selectedDetailRoom.owner.name}
                      </p>
                      <p>
                        <span className="font-medium">Số điện thoại:</span>{' '}
                        {selectedDetailRoom.owner.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Hình ảnh</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {selectedDetailRoom.images.map((image, index) => (
                        <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${selectedDetailRoom.title} - Ảnh ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Config Modal */}
      <Dialog open={isConfigOpen} onClose={() => setIsConfigOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-xl font-semibold">
                Cấu hình phòng trọ
              </Dialog.Title>
              <button onClick={() => setIsConfigOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleConfigSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Cấu hình hình ảnh</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Số lượng ảnh tối đa</label>
                      <input
                        type="number"
                        name="maxImages"
                        defaultValue={roomConfig.maxImages}
                        min="1"
                        className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Số lượng ảnh tối thiểu</label>
                      <input
                        type="number"
                        name="minImages"
                        defaultValue={roomConfig.minImages}
                        min="1"
                        className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Cấu hình giá và diện tích</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Giá tối đa (VND)</label>
                      <input
                        type="number"
                        name="maxPrice"
                        defaultValue={roomConfig.maxPrice}
                        min="0"
                        className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Giá tối thiểu (VND)</label>
                      <input
                        type="number"
                        name="minPrice"
                        defaultValue={roomConfig.minPrice}
                        min="0"
                        className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Diện tích tối đa (m²)</label>
                      <input
                        type="number"
                        name="maxArea"
                        defaultValue={roomConfig.maxArea}
                        min="0"
                        className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Diện tích tối thiểu (m²)</label>
                      <input
                        type="number"
                        name="minArea"
                        defaultValue={roomConfig.minArea}
                        min="0"
                        className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Trường bắt buộc</h3>
                <div className="space-y-2">
                  {['title', 'price', 'area', 'address', 'description', 'images'].map((field) => (
                    <label key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        name="requiredFields"
                        value={field}
                        defaultChecked={roomConfig.requiredFields.includes(field)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {field === 'title' && 'Tiêu đề'}
                        {field === 'price' && 'Giá thuê'}
                        {field === 'area' && 'Diện tích'}
                        {field === 'address' && 'Địa chỉ'}
                        {field === 'description' && 'Mô tả'}
                        {field === 'images' && 'Hình ảnh'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsConfigOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  Lưu cấu hình
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Room Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-xl font-semibold">
                {selectedRoom ? 'Chỉnh sửa phòng trọ' : 'Thêm phòng trọ mới'}
              </Dialog.Title>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitRoom} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                  <input
                    type="text"
                    name="title"
                    className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={selectedRoom?.title}
                    required={roomConfig.requiredFields.includes('title')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giá thuê (VND)</label>
                  <input
                    type="number"
                    name="price"
                    min={roomConfig.minPrice}
                    max={roomConfig.maxPrice}
                    className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={selectedRoom?.price}
                    required={roomConfig.requiredFields.includes('price')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Diện tích (m²)</label>
                  <input
                    type="number"
                    name="area"
                    min={roomConfig.minArea}
                    max={roomConfig.maxArea}
                    className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={selectedRoom?.area}
                    required={roomConfig.requiredFields.includes('area')}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={selectedRoom?.address}
                    required={roomConfig.requiredFields.includes('address')}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                  <textarea
                    name="description"
                    rows={4}
                    className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={selectedRoom?.description}
                    required={roomConfig.requiredFields.includes('description')}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Chọn ảnh
                  </button>
                  {validationErrors.images && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.images}</p>
                  )}
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={preview.id} className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image
                          src={preview.preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center justify-center h-full gap-2">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => handleMoveImage(index, 'up')}
                                className="p-1 bg-white rounded-full hover:bg-gray-100"
                              >
                                <ArrowUp size={16} />
                              </button>
                            )}
                            {index < imagePreviews.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleMoveImage(index, 'down')}
                                className="p-1 bg-white rounded-full hover:bg-gray-100"
                              >
                                <ArrowDown size={16} />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(preview.id)}
                              className="p-1 bg-white rounded-full hover:bg-gray-100"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Tối thiểu {roomConfig.minImages} ảnh, tối đa {roomConfig.maxImages} ảnh
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                  <select
                    name="status"
                    className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={selectedRoom?.status || 'AVAILABLE'}
                    required
                  >
                    <option value="AVAILABLE">Còn trống</option>
                    <option value="RENTED">Đã cho thuê</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  {selectedRoom ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Xác nhận xóa phòng trọ
            </Dialog.Title>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa phòng trọ &quot;{roomToDelete?.title}&quot;? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 