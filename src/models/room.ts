export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    area: number;
    roomTypeId: string;
    roomType: string;
    address: string;
    contactPhone: string;
    contactName: string;
    ownerName: string;
    ownerId: string;
    rating: number;
    totalView: number;
    totalFavorites: number;
    status: string;
    state: string;
    availableFrom: string;
    availableTo: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    images: string[];
}