'use client';

import { useState } from 'react';
import { Save, Globe, Bell, Shield, Mail, LucideIcon } from 'lucide-react';

interface SettingOption {
  value: string;
  label: string;
}

interface SettingItem {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'password';
  value: string | boolean | number;
  options?: SettingOption[];
}

interface SettingSection {
  id: string;
  title: string;
  icon: LucideIcon;
  items: SettingItem[];
}

const settings: SettingSection[] = [
  {
    id: 'general',
    title: 'Cài đặt chung',
    icon: Globe,
    items: [
      {
        id: 'site_name',
        label: 'Tên trang web',
        type: 'text',
        value: 'UniLife',
      },
      {
        id: 'site_description',
        label: 'Mô tả trang web',
        type: 'textarea',
        value: 'Nền tảng kết nối sinh viên tìm phòng trọ và việc làm',
      },
      {
        id: 'timezone',
        label: 'Múi giờ',
        type: 'select',
        value: 'Asia/Ho_Chi_Minh',
        options: [
          { value: 'Asia/Ho_Chi_Minh', label: 'Việt Nam (UTC+7)' },
          { value: 'Asia/Bangkok', label: 'Thái Lan (UTC+7)' },
          { value: 'Asia/Singapore', label: 'Singapore (UTC+8)' },
        ],
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Cài đặt thông báo',
    icon: Bell,
    items: [
      {
        id: 'email_notifications',
        label: 'Gửi thông báo qua email',
        type: 'checkbox',
        value: true,
      },
      {
        id: 'push_notifications',
        label: 'Gửi thông báo đẩy',
        type: 'checkbox',
        value: true,
      },
      {
        id: 'notification_schedule',
        label: 'Lịch gửi thông báo',
        type: 'select',
        value: 'daily',
        options: [
          { value: 'immediate', label: 'Ngay lập tức' },
          { value: 'daily', label: 'Hàng ngày' },
          { value: 'weekly', label: 'Hàng tuần' },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Bảo mật',
    icon: Shield,
    items: [
      {
        id: 'password_policy',
        label: 'Chính sách mật khẩu',
        type: 'select',
        value: 'medium',
        options: [
          { value: 'low', label: 'Thấp (6 ký tự)' },
          { value: 'medium', label: 'Trung bình (8 ký tự)' },
          { value: 'high', label: 'Cao (12 ký tự)' },
        ],
      },
      {
        id: 'two_factor_auth',
        label: 'Xác thực hai yếu tố',
        type: 'checkbox',
        value: true,
      },
      {
        id: 'session_timeout',
        label: 'Thời gian hết phiên (phút)',
        type: 'number',
        value: 30,
      },
    ],
  },
  {
    id: 'email',
    title: 'Cài đặt email',
    icon: Mail,
    items: [
      {
        id: 'smtp_host',
        label: 'SMTP Host',
        type: 'text',
        value: 'smtp.gmail.com',
      },
      {
        id: 'smtp_port',
        label: 'SMTP Port',
        type: 'number',
        value: 587,
      },
      {
        id: 'smtp_username',
        label: 'SMTP Username',
        type: 'text',
        value: 'your-email@gmail.com',
      },
      {
        id: 'smtp_password',
        label: 'SMTP Password',
        type: 'password',
        value: '********',
      },
    ],
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const renderSettingInput = (item: SettingItem) => {
    switch (item.type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={item.value as string}
          />
        );
      case 'textarea':
        return (
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={item.value as string}
          />
        );
      case 'select':
        return (
          <select
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={item.value as string}
          >
            {item.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            className="w-4 h-4"
            defaultChecked={item.value as boolean}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={item.value as number}
          />
        );
      case 'password':
        return (
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={item.value as string}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cài đặt hệ thống</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Save size={20} />
          Lưu thay đổi
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {settings.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 ${
                      activeTab === section.id ? 'bg-gray-50 text-primary' : ''
                    }`}
                  >
                    <Icon size={20} />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {settings.map((section) => (
              <div
                key={section.id}
                className={`space-y-6 ${activeTab === section.id ? 'block' : 'hidden'}`}
              >
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {item.label}
                      </label>
                      {renderSettingInput(item)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 