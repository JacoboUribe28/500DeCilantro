import { Address } from "../models/address";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/addresses" || "";

// Obtener todas las direcciones
export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await api.get<Address[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener direcciones", error);
        return [];
    }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
    try {
        const response = await api.get<Address>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Dirección no encontrada", error);
        return null;
    }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
    try {
        const response = await api.post<Address>(API_URL, address);
        return response.data;
    } catch (error) {
        console.error("Error al crear dirección", error);
        return null;
    }
};

// Actualizar dirección
export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
    try {
        const response = await api.put<Address>(`${API_URL}/${id}`, address);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar dirección", error);
        return null;
    }
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar dirección", error);
        return false;
    }
};
