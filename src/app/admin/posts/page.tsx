'use client';

import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, MessageSquare } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Tìm phòng trọ gần ĐH Bách Khoa',
    content: 'Cần tìm phòng trọ gần ĐH Bách Khoa, giá khoảng 2-3tr/tháng...',
    post_type: 'ROOM',
    user: {
      username: 'user1',
      fullname: 'Nguyễn Văn A',
    },
    status: 'ACTIVE',
    views: 1234,
    likes: 56,
    comments: 12,
    created_at: '2024-03-20',
  },
  {
    id: 2,
    title: 'Tìm việc làm thêm part-time',
    content: 'Sinh viên năm 3 tìm việc làm thêm part-time vào buổi tối...',
    post_type: 'JOB',
    user: {
      username: 'user2',
      fullname: 'Trần Thị B',
    },
    status: 'ACTIVE',
    views: 567,
    likes: 23,
    comments: 5,
    created_at: '2024-03-19',
  },
  // Thêm dữ liệu mẫu khác...
];

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý bài đăng</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Plus size={20} />
          Thêm bài đăng
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm bài đăng..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Tất cả loại</option>
          <option value="ROOM">Phòng trọ</option>
          <option value="JOB">Việc làm</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang hiển thị</option>
          <option value="HIDDEN">Đã ẩn</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người đăng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tương tác
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="max-w-md">
                    <h3 className="font-medium line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{post.content}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3" />
                    <div>
                      <div className="font-medium">{post.user.fullname}</div>
                      <div className="text-sm text-gray-500">@{post.user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.post_type === 'ROOM' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {post.post_type === 'ROOM' ? 'Phòng trọ' : 'Việc làm'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {post.status === 'ACTIVE' ? 'Đang hiển thị' : 'Đã ẩn'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye size={16} className="text-gray-400" />
                      <span className="text-sm">{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} className="text-gray-400" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {post.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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