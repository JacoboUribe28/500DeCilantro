import { Order } from "../models/order";

const API_URL = import.meta.env.VITE_API_URL + "/orders" || ""; // Reemplaza con la URL real

// Obtener todos los pedidos
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener pedidos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un pedido por ID
export const getOrderById = async (id: number): Promise<Order | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Pedido no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo pedido
export const createOrder = async (order: Omit<Order, "id">): Promise<Order | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error("Error al crear pedido");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar pedido
export const updateOrder = async (id: number, order: Partial<Order>): Promise<Order | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error("Error al actualizar pedido");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar pedido
export const deleteOrder = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar pedido");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
