import { Motorcycle } from "../models/motorcycle";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/motorcycles" || "";

// Obtener todas las motocicletas
export const getMotorcycles = async (): Promise<Motorcycle[]> => {
    try {
        const response = await api.get<Motorcycle[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener motocicletas", error);
        return [];
    }
};

// Obtener una motocicleta por ID
export const getMotorcycleById = async (id: string): Promise<Motorcycle | null> => {
    try {
        const response = await api.get<Motorcycle>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Motocicleta no encontrada", error);
        return null;
    }
};

// Crear una nueva motocicleta
export const createMotorcycle = async (motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> => {
    try {
        const response = await api.post<Motorcycle>(API_URL, motorcycle);
        return response.data;
    } catch (error) {
        console.error("Error al crear motocicleta", error);
        return null;
    }
};

// Actualizar motocicleta
export const updateMotorcycle = async (id: string, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> => {
    try {
        const response = await api.put<Motorcycle>(`${API_URL}/${id}`, motorcycle);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar motocicleta", error);
        return null;
    }
};

// Eliminar motocicleta
export const deleteMotorcycle = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar motocicleta", error);
        return false;
    }
};
