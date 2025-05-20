import { Driver } from "../models/driver";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL  + "/drivers" || "";

// Obtener todos los conductores
export const getDrivers = async (): Promise<Driver[]> => {
    try {
        const response = await api.get<Driver[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener conductores", error);
        return [];
    }
};

// Obtener un conductor por ID
export const getDriverById = async (id: string): Promise<Driver | null> => {
    try {
        const response = await api.get<Driver>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Conductor no encontrado", error);
        return null;
    }
};

// Crear un nuevo conductor
export const createDriver = async (driver: Omit<Driver, "id">): Promise<Driver | null> => {
    try {
        const response = await api.post<Driver>(API_URL, driver);
        return response.data;
    } catch (error) {
        console.error("Error al crear conductor", error);
        return null;
    }
};

// Actualizar conductor
export const updateDriver = async (id: string, driver: Partial<Driver>): Promise<Driver | null> => {
    try {
        const response = await api.put<Driver>(`${API_URL}/${id}`, driver);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar conductor", error);
        return null;
    }
};

// Eliminar conductor
export const deleteDriver = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar conductor", error);
        return false;
    }
};
