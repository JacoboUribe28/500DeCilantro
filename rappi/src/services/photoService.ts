import { Photo } from "../models/photo";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/photos" || "";

// Obtener todas las fotos
export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await api.get<Photo[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener fotos", error);
        return [];
    }
};

// Obtener una foto por ID
export const getPhotoById = async (id: string): Promise<Photo | null> => {
    try {
        const response = await api.get<Photo>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Foto no encontrada", error);
        return null;
    }
};

// Crear una nueva foto
export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo | null> => {
    try {
        const response = await api.post<Photo>(API_URL, photo);
        return response.data;
    } catch (error) {
        console.error("Error al crear foto", error);
        return null;
    }
};

// Actualizar foto
export const updatePhoto = async (id: string, photo: Partial<Photo>): Promise<Photo | null> => {
    try {
        const response = await api.put<Photo>(`${API_URL}/${id}`, photo);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar foto", error);
        return null;
    }
};

// Eliminar foto
export const deletePhoto = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar foto", error);
        return false;
    }
};
