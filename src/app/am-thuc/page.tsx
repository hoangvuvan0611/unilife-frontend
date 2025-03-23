import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Restaurant {
    id: string;
    name: string;
    address: string;
    image: string;
    category: string;
    isPromoted?: boolean;
}

export default function FoodPage() {
    const restaurants: Restaurant[] = [
        {
            id: '1',
            name: 'Sữa Chua Trân Châu Hạ Long',
            address: '116 Tân Mai, P. Tân Mai, Hoàng Mai',
            image: '/restaurants/sua-chua.jpg',
            category: 'Coffee/Dessert',
            isPromoted: true
        },
        // Thêm các nhà hàng khác...
    ];

    return (
        <div className="min-h-screen max-w-7xl mx-auto py-6">
            {/* Hero Section với ảnh nền */}
            <div className="relative h-[120px] rounded-lg overflow-hidden">
                {/* Ảnh nền */}
                <div className="absolute inset-0">
                    <Image 
                        src="/images/organic-breadcrumb.png" 
                        alt="Ẩm thực"
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative h-full mx-auto px-4">
                    <div className="flex flex-col text-center justify-center h-full max-w-2xl">
                        <h1 className="text-4xl md:text-2xl font-bold mb-4">
                            Trải nghiệm ẩm thực tuyệt vời
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-4">
                {/* Dành cho bạn */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Dành cho bạn</h2>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Món Âu', 'Món Nhật', 'Món Thái'].map((category, index) => (
                            <div key={category} className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer">
                                <Image 
                                    src={`/images/mon-au.png`} 
                                    alt={category}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-2xl font-bold text-white mb-1">{category}</h3>
                                        <p className="text-white/80">{`${(index + 1) * 40} bài viết`}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        {['Tất cả', 'Ăn sáng', 'Ăn trưa', 'Ăn vặt', 'Cà phê', 'Gần bạn', 'Du lịch', 'Làm đẹp'].map((tab, index) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                                    index === 0
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {restaurants.map((restaurant) => (
                        <div 
                            key={restaurant.id} 
                            className="bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Ảnh nhà hàng */}
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={`/images/mon-au.png`}
                                    alt={restaurant.name}
                                    fill
                                    className="w-full h-full object-cover"
                                />
                                {restaurant.isPromoted && (
                                    <div className="absolute top-2 left-2">
                                        <span className="inline-flex items-center bg-yellow-400 rounded-lg p-1">
                                            ⭐
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Thông tin nhà hàng */}
                            <div className="p-3">
                                <h3 className="font-semibold text-base line-clamp-1 mb-1">
                                    {restaurant.name}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-1 mb-2">
                                    {restaurant.address}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-red-50 text-red-600">
                                        {restaurant.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}   
