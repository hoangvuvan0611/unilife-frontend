'use client';

import { useState } from 'react';
import { CreatePostModal } from '@/components/CreatePostModal';

export default function CedePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen max-w-7xl mx-auto grid grid-cols-12 gap-4 mt-8">
            {/* Main content */}
            <div className="col-span-8 border-x border-gray-200">
                {/* Post creation box */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200" /> {/* Avatar */}
                        <div 
                            onClick={() => setIsModalOpen(true)}
                            className="flex-1 cursor-pointer"
                        >
                            <div className="w-full p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
                                Bạn muốn đăng gì?
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts list */}
                <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Người đăng</span>
                                    <span className="text-gray-500">· 2h</span>
                                </div>
                                <p className="mt-2">Nội dung bài đăng về nhượng trọ...</p>
                                <div className="flex gap-6 mt-3 text-gray-500">
                                    <button className="flex items-center gap-1">
                                        <span>❤️</span> 1.1K
                                    </button>
                                    <button className="flex items-center gap-1">
                                        <span>💬</span> 16
                                    </button>
                                    <button className="flex items-center gap-1">
                                        <span>🔄</span> 38
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right sidebar */}
            <div className="col-span-4 p-4">
                {/* Search box */}
                <div className="mb-6">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Tìm kiếm"
                            className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10"
                        />
                        <span className="absolute left-3 top-2.5">🔍</span>
                    </div>
                </div>

                {/* Trending section */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h2 className="text-xl font-bold mb-4">Xu hướng</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Trending in Hanoi</p>
                            <p className="font-bold">#NhuongTro</p>
                            <p className="text-sm text-gray-500">2,911 posts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <CreatePostModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    )
}
