import { Customer } from "../models/customer";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL  + "/customers" || "";

// Obtener todos los clientes
export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get<Customer[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener clientes", error);
        return [];
    }
};

// Obtener un cliente por ID
export const getCustomerById = async (id: string): Promise<Customer | null> => {
    try {
        const response = await api.get<Customer>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Cliente no encontrado", error);
        return null;
    }
};

// Crear un nuevo cliente
export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await api.post<Customer>(API_URL, customer);
        return response.data;
    } catch (error) {
        console.error("Error al crear cliente", error);
        return null;
    }
};

// Actualizar cliente
export const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer | null> => {
    try {
        const response = await api.put<Customer>(`${API_URL}/${id}`, customer);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cliente", error);
        return null;
    }
};

// Eliminar cliente
export const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar cliente", error);
        return false;
    }
};
