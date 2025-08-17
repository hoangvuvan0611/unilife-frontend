import { Room } from "@/models/room";
import apiClient from "./appClient";

export const roomApi = {
    getToShowList: (page: number, size: number): Promise<Room> => apiClient.get(`/page=${page}&size=${size}`),
}