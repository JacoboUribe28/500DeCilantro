import { Restaurant } from "../models/restaurant";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/restaurants" || "";

// Obtener todos los restaurantes
export const getRestaurants = async (): Promise<Restaurant[]> => {
    try {
        const response = await api.get<Restaurant[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener restaurantes", error);
        return [];
    }
};

// Obtener un restaurante por ID
export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
    try {
        const response = await api.get<Restaurant>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Restaurante no encontrado", error);
        return null;
    }
};

// Crear un nuevo restaurante
export const createRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> => {
    try {
        const response = await api.post<Restaurant>(API_URL, restaurant);
        return response.data;
    } catch (error) {
        console.error("Error al crear restaurante", error);
        return null;
    }
};

// Actualizar restaurante
export const updateRestaurant = async (id: string, restaurant: Partial<Restaurant>): Promise<Restaurant | null> => {
    try {
        const response = await api.put<Restaurant>(`${API_URL}/${id}`, restaurant);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar restaurante", error);
        return null;
    }
};

// Eliminar restaurante
export const deleteRestaurant = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar restaurante", error);
        return false;
    }
};
