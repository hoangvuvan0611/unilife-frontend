'use client';

import { useState } from 'react';
import { Search, Plus, Trash2, User, Activity, History, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  created_at: string;
  last_login: string;
  avatar?: string;
}

const users: User[] = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    fullname: 'Nguyễn Văn A',
    role: 'USER',
    status: 'ACTIVE',
    created_at: '2024-03-20',
    last_login: '2024-03-25 10:30:00',
    avatar: '/images/avatar1.jpg',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    fullname: 'Trần Thị B',
    role: 'ADMIN',
    status: 'ACTIVE',
    created_at: '2024-03-19',
    last_login: '2024-03-25 09:15:00',
    avatar: '/images/avatar2.jpg',
  },
  // Thêm dữ liệu mẫu khác...
];

const userActivity = [
  {
    id: 1,
    user_id: 1,
    action: 'Đăng bài',
    details: 'Đã đăng bài tìm phòng trọ',
    timestamp: '2024-03-25 10:30:00',
  },
  {
    id: 2,
    user_id: 1,
    action: 'Bình luận',
    details: 'Đã bình luận vào bài viết #123',
    timestamp: '2024-03-25 09:15:00',
  },
  // Thêm dữ liệu mẫu khác...
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleViewActivity = (user: User) => {
    setSelectedUser(user);
    setIsActivityModalOpen(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Tất cả vai trò</option>
          <option value="USER">Người dùng</option>
          <option value="ADMIN">Quản trị viên</option>
          <option value="MODERATOR">Điều hành viên</option>
        </select>
        <select 
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="INACTIVE">Không hoạt động</option>
          <option value="BANNED">Đã khóa</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      {user.avatar ? (
                        <UserAvatar name='Hoang'/>
                      ) : (
                        <User size={20} className="w-full h-full text-gray-400" />
                      )}
                    </div>
                    <span className="font-medium">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-800' 
                      : user.role === 'MODERATOR'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role === 'ADMIN' ? 'Quản trị viên' : 
                     user.role === 'MODERATOR' ? 'Điều hành viên' : 'Người dùng'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : user.status === 'BANNED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'ACTIVE' ? 'Đang hoạt động' : 
                     user.status === 'BANNED' ? 'Đã khóa' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {user.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleViewUser(user)}
                      className="p-2 text-gray-500 hover:text-primary"
                    >
                      <User size={18} />
                    </button>
                    <button 
                      onClick={() => handleViewActivity(user)}
                      className="p-2 text-gray-500 hover:text-primary"
                    >
                      <Activity size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user)}
                      className="p-2 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={18} />
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
          Hiển thị 1 đến 10 của {filteredUsers.length} kết quả
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

      {/* User Detail Modal */}
      <Dialog open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-xl font-semibold">
                Thông tin người dùng
              </Dialog.Title>
              <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            {selectedUser && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                    {selectedUser.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={40} className="w-full h-full text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{selectedUser.fullname}</h3>
                    <p className="text-gray-500">@{selectedUser.username}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Thông tin cơ bản</h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Email:</span>{' '}
                        {selectedUser.email}
                      </p>
                      <p>
                        <span className="font-medium">Vai trò:</span>{' '}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedUser.role === 'ADMIN' 
                            ? 'bg-purple-100 text-purple-800' 
                            : selectedUser.role === 'MODERATOR'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedUser.role === 'ADMIN' ? 'Quản trị viên' : 
                           selectedUser.role === 'MODERATOR' ? 'Điều hành viên' : 'Người dùng'}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Trạng thái:</span>{' '}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedUser.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : selectedUser.status === 'BANNED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedUser.status === 'ACTIVE' ? 'Đang hoạt động' : 
                           selectedUser.status === 'BANNED' ? 'Đã khóa' : 'Không hoạt động'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Thông tin đăng nhập</h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Ngày tạo:</span>{' '}
                        {selectedUser.created_at}
                      </p>
                      <p>
                        <span className="font-medium">Lần đăng nhập cuối:</span>{' '}
                        {selectedUser.last_login}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* User Activity Modal */}
      <Dialog open={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-xl font-semibold">
                Lịch sử hoạt động
              </Dialog.Title>
              <button onClick={() => setIsActivityModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            {selectedUser && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {selectedUser.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={24} className="w-full h-full text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedUser.fullname}</h3>
                    <p className="text-gray-500">@{selectedUser.username}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {userActivity
                    .filter(activity => activity.user_id === selectedUser.id)
                    .map(activity => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <History size={16} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{activity.action}</span>
                            <span className="text-gray-500">{activity.details}</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {activity.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Xác nhận xóa người dùng
            </Dialog.Title>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa người dùng &quot;{selectedUser?.username}&quot;? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // TODO: Implement delete logic
                  setIsDeleteModalOpen(false);
                }}
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