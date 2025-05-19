import { Address } from "../models/address";

const API_URL = import.meta.env.VITE_API_URL + "/addresses" || ""; // Reemplaza con la URL real

// Obtener todas las direcciones
export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener direcciones");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Dirección no encontrada");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
        });
        if (!response.ok) throw new Error("Error al crear dirección");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar dirección
export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
        });
        if (!response.ok) throw new Error("Error al actualizar dirección");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar dirección");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
