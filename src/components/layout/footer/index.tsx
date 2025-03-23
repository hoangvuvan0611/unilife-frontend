'use client';

import Link from 'next/link';

const footerSections = {
  support: {
    title: 'Hỗ trợ',
    links: [
      { label: 'Trung tâm trợ giúp', href: '/help' },
      { label: 'AirCover', href: '/aircover' },
      { label: 'Chống phân biệt đối xử', href: '/anti-discrimination' },
      { label: 'Hỗ trợ người khuyết tật', href: '/disability-support' },
      { label: 'Các tùy chọn hủy', href: '/cancellation-options' },
      { label: 'Báo cáo lo ngại của khu dân cư', href: '/neighborhood-concerns' },
    ],
  },
  hosting: {
    title: 'Đón tiếp khách',
    links: [
      { label: 'Cho thuê nhà trên Airbnb', href: '/host' },
      { label: 'AirCover cho Chủ nhà', href: '/aircover-host' },
      { label: 'Tài nguyên về đón tiếp khách', href: '/hosting-resources' },
      { label: 'Diễn đàn cộng đồng', href: '/community' },
      { label: 'Đón tiếp khách có trách nhiệm', href: '/responsible-hosting' },
      { label: 'Tham gia khóa học miễn phí về công việc Đón tiếp khách', href: '/hosting-course' },
      { label: 'Tìm đồng chủ nhà', href: '/find-cohost' },
    ],
  },
  airbnb: {
    title: 'Airbnb',
    links: [
      { label: 'Trang tin tức', href: '/news' },
      { label: 'Tính năng mới', href: '/new-features' },
      { label: 'Cơ hội nghề nghiệp', href: '/careers' },
      { label: 'Nhà đầu tư', href: '/investors' },
      { label: 'Chỗ ở khẩn cấp Airbnb.org', href: '/emergency' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="font-semibold text-base">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 hover:underline hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
              <span>© 2025 Airbnb, Inc.</span>
              <span>·</span>
              <Link href="/privacy" className="hover:underline">Quyền riêng tư</Link>
              <span>·</span>
              <Link href="/terms" className="hover:underline">Điều khoản</Link>
              <span>·</span>
              <Link href="/sitemap" className="hover:underline">Sơ đồ trang web</Link>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-transparent text-sm font-semibold cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-2">
                <option value="vi">Tiếng Việt (VN)</option>
                <option value="en">English</option>
              </select>
              <select className="bg-transparent text-sm font-semibold cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-2">
                <option value="vnd">VND</option>
                <option value="usd">USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 