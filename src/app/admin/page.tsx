'use client';

import { useState } from 'react';
import { Users, Building2, MessageSquare, Bell, TrendingUp, MapPin, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stats = [
  {
    title: 'Tổng số người dùng',
    value: '1,234',
    icon: Users,
    color: 'bg-blue-500',
    trend: '+12%',
    trendColor: 'text-green-500',
  },
  {
    title: 'Tổng số phòng trọ',
    value: '567',
    icon: Building2,
    color: 'bg-green-500',
    trend: '+5%',
    trendColor: 'text-green-500',
  },
  {
    title: 'Tổng số bài đăng',
    value: '890',
    icon: MessageSquare,
    color: 'bg-yellow-500',
    trend: '+8%',
    trendColor: 'text-green-500',
  },
  {
    title: 'Thông báo mới',
    value: '12',
    icon: Bell,
    color: 'bg-red-500',
    trend: '-3%',
    trendColor: 'text-red-500',
  },
];

const activityData = [
  {
    id: 1,
    type: 'POST',
    user: {
      name: 'Nguyễn Văn A',
      avatar: '/images/avatar1.jpg',
    },
    action: 'đã đăng bài tìm phòng trọ mới',
    time: '2 giờ trước',
    details: {
      title: 'Tìm phòng trọ gần ĐH Bách Khoa',
      location: 'Quận 10, TP.HCM',
    },
  },
  {
    id: 2,
    type: 'ROOM',
    user: {
      name: 'Trần Thị B',
      avatar: '/images/avatar2.jpg',
    },
    action: 'đã thêm phòng trọ mới',
    time: '3 giờ trước',
    details: {
      title: 'Phòng trọ giá rẻ gần ĐH Kinh Tế',
      price: '2.5 triệu/tháng',
    },
  },
  // Thêm dữ liệu mẫu khác...
];

const chartData = [
  { name: 'Tháng 1', users: 400, rooms: 240, posts: 180 },
  { name: 'Tháng 2', users: 600, rooms: 320, posts: 240 },
  { name: 'Tháng 3', users: 800, rooms: 400, posts: 300 },
  { name: 'Tháng 4', users: 1000, rooms: 480, posts: 360 },
  { name: 'Tháng 5', users: 1200, rooms: 560, posts: 420 },
  { name: 'Tháng 6', users: 1400, rooms: 640, posts: 480 },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="day">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm nay</option>
          </select>
        </div>
      </div>
      
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
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={16} className={stat.trendColor} />
                    <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Thống kê theo thời gian</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" name="Người dùng" />
                <Line type="monotone" dataKey="rooms" stroke="#10B981" name="Phòng trọ" />
                <Line type="monotone" dataKey="posts" stroke="#F59E0B" name="Bài đăng" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            {activityData.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-gray-500">{activity.action}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {activity.details.title}
                    {activity.details.location && (
                      <span className="ml-2 text-gray-500">
                        <MapPin size={14} className="inline-block mr-1" />
                        {activity.details.location}
                      </span>
                    )}
                    {activity.details.price && (
                      <span className="ml-2 text-gray-500">
                        <DollarSign size={14} className="inline-block mr-1" />
                        {activity.details.price}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 