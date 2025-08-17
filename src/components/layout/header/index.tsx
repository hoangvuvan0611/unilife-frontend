'use client';

import { Globe, Menu, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Nav from './nav';
import SearchBar from './search';

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
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/uni-life-logo.png"
              alt="UniLife Logo"
              width={65}
              height={55}
              priority
            />
          </Link>

          {/* Navigation Menu */}
          <Nav />   

          {/* Search Bar */}
          <SearchBar />

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            <Link href="/host" className="hidden md:block hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm">
              Cho thuê trọ qua UniLife
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
                <div ref={menuRef} className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 border-t-2">
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
                      Cho thuê trọ qua UniLife
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
