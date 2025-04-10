import Image from "next/image";

export default function EntertainmentPage() {
    const entertainmentPlaces = [
        {
            id: 1,
            name: "Cyber Gaming Center",
            type: "Quán Net",
            address: "123 Đường ABC, Quận 1",
            description: "Quán net cao cấp với đầy đủ trang thiết bị hiện đại",
            imageUrl: "/images/cyber-game.png"
        },
        {
            id: 2,
            name: "Billiards Paradise",
            type: "Quán Billiards",
            address: "456 Đường XYZ, Quận 2",
            description: "Không gian rộng rãi với nhiều bàn bi-a chất lượng cao",
            imageUrl: "/images/cyber-game.png"
        },
        {
            id: 3,
            name: "Board Game Cafe",
            type: "Quán Board Game",
            address: "789 Đường DEF, Quận 3",
            description: "Địa điểm lý tưởng để chơi board game cùng bạn bè",
            imageUrl: "/images/cyber-game.png"
        }
    ];

    return (
        <div className="min-h-screen max-w-7xl mx-auto py-8 px-4">
            {/* Hero Section với ảnh nền */}
            <div className="relative h-[120px] rounded-lg overflow-hidden">
                {/* Ảnh nền */}
                <div className="absolute inset-0">
                    <Image 
                        src="/images/relax-banner1.png" 
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

            <h1 className="text-3xl font-bold mb-8">Địa Điểm Giải Trí</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entertainmentPlaces.map((place) => (
                    <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="h-48 w-full bg-gray-200">
                            <Image 
                                src={place.imageUrl} 
                                alt={place.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{place.type}</p>
                            <p className="text-sm text-gray-500 mb-2">{place.address}</p>
                            <p className="text-sm text-gray-700">{place.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}   
