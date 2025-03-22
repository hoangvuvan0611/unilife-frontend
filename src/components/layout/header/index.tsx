'use client';

import { Globe, Menu, Search, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-sm">
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
            <div className="relative">
              <button 
                ref={buttonRef}
                className="flex items-center gap-2 p-1.5 hover:shadow-md rounded-full border"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={16} />
                <UserCircle size={20} className="text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div ref={menuRef} className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2">
                  <div className="py-2">
                    <Link href="/register" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Đăng ký
                    </Link>
                    <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Đăng nhập
                    </Link>
                  </div>
                  <div className="border-t-2">
                    <Link href="/host" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Cho thuê chỗ ở qua Airbnb
                    </Link>
                    <Link href="/experiences" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Tổ chức trải nghiệm
                    </Link>
                    <Link href="/help" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Trung tâm trợ giúp
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
