import { Globe, Menu, Search, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/uni_life_logo1.png"
              alt="Airbnb Logo"
              width={100}
              height={100}
              priority
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center w-full rounded-full border shadow-sm hover:shadow-md transition-shadow">
              <button className="px-4 py-1.5 text-sm font-medium border-r">Địa điểm</button>
              <button className="px-4 py-1.5 text-sm font-medium border-r">Nhận phòng</button>
              <button className="px-4 py-1.5 text-sm font-medium border-r">Trả phòng</button>
              <button className="px-4 py-1.5 text-sm font-medium">Khách</button>
              <button className="p-1.5 ml-2 rounded-full bg-primary text-white">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            <Link href="/host" className="hidden md:block hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm">
              Cho thuê chỗ ở qua Airbnb
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Globe size={16} />
            </button>
            <button className="flex items-center gap-2 p-1.5 hover:shadow-md rounded-full border">
              <Menu size={16} />
              <UserCircle size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
