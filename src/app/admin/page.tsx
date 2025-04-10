'use client';

import { Users, Building2, MessageSquare, Bell } from 'lucide-react';

const stats = [
  {
    title: 'Tổng số người dùng',
    value: '1,234',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Tổng số phòng trọ',
    value: '567',
    icon: Building2,
    color: 'bg-green-500',
  },
  {
    title: 'Tổng số bài đăng',
    value: '890',
    icon: MessageSquare,
    color: 'bg-yellow-500',
  },
  {
    title: 'Thông báo mới',
    value: '12',
    icon: Bell,
    color: 'bg-red-500',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium">Người dùng {item} đã đăng bài mới</p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 