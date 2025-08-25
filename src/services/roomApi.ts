import { Room } from "@/models/room";
import apiClient from "./appClient";

export interface ApiResponseDataList<T> {
    dataList: T[];
    success: boolean;
    message: string;
    total: number;
}


export const roomApi = {
    getShowInitList: (page: number, size: number): Promise<ApiResponseDataList<Room>> => apiClient.get(`/room/page=${page}&size=${size}`),
}