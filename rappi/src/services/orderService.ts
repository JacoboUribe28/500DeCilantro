import { Order } from "../models/order";
import api from "../interceptors/axiosInterceptor";

const API_URL = (import.meta.env.VITE_API_URL || "") + "/orders";

// Obtener todas las órdenes
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await api.get<Order[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener órdenes", error);
        return [];
    }
};

// Obtener una orden por ID
export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const response = await api.get<Order>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Orden no encontrada", error);
        return null;
    }
};

// Crear una nueva orden
export const createOrder = async (order: Omit<Order, "id">): Promise<Order | null> => {
    try {
        const response = await api.post<Order>(API_URL, order);
        return response.data;
    } catch (error) {
        console.error("Error al crear orden", error);
        return null;
    }
};

// Actualizar orden
export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order | null> => {
    try {
        const response = await api.put<Order>(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar orden", error);
        return null;
    }
};

// Eliminar orden
export const deleteOrder = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar orden", error);
        return false;
    }
};
