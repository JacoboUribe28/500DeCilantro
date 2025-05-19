import { Customer } from "../models/customer";

const API_URL = import.meta.env.VITE_API_URL + "/customers" || ""; // Reemplaza con la URL real

// Obtener todos los clientes
export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener clientes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un cliente por ID
export const getCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Cliente no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo cliente
export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error("Error al crear cliente");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar cliente
export const updateCustomer = async (id: number, customer: Partial<Customer>): Promise<Customer | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error("Error al actualizar cliente");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar cliente
export const deleteCustomer = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar cliente");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
