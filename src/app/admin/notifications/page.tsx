'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, Bell } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Thông báo hệ thống',
    message: 'Hệ thống sẽ bảo trì vào ngày 25/03/2024',
    type: 'SYSTEM',
    is_read: false,
    link: '/system-maintenance',
    created_at: '2024-03-20 10:00:00',
  },
  {
    id: 2,
    title: 'Có bài đăng mới',
    message: 'Người dùng user1 đã đăng bài tìm phòng trọ mới',
    type: 'POST',
    is_read: true,
    link: '/posts/123',
    created_at: '2024-03-19 15:30:00',
  },
  // Thêm dữ liệu mẫu khác...
];

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý thông báo</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Plus size={20} />
          Thêm thông báo
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Tất cả loại</option>
          <option value="SYSTEM">Hệ thống</option>
          <option value="POST">Bài đăng</option>
          <option value="USER">Người dùng</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Tất cả trạng thái</option>
          <option value="read">Đã đọc</option>
          <option value="unread">Chưa đọc</option>
        </select>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                !notification.is_read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'SYSTEM' 
                      ? 'bg-blue-100 text-blue-800' 
                      : notification.type === 'POST'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">
                        {notification.created_at}
                      </span>
                      {notification.link && (
                        <a
                          href={notification.link}
                          className="text-xs text-primary hover:underline"
                        >
                          Xem chi tiết
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Hiển thị 1 đến 10 của 100 kết quả
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
            Sau
          </button>
        </div>
      </div>
    </div>
  );
} 