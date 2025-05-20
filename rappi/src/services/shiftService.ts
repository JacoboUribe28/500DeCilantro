import { Shift } from "../models/shift";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/shifts" || "";

// Obtener todos los turnos
export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await api.get<Shift[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener turnos", error);
        return [];
    }
};

// Obtener un turno por ID
export const getShiftById = async (id: string): Promise<Shift | null> => {
    try {
        const response = await api.get<Shift>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Turno no encontrado", error);
        return null;
    }
};

// Crear un nuevo turno
export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift | null> => {
    try {
        const response = await api.post<Shift>(API_URL, shift);
        return response.data;
    } catch (error) {
        console.error("Error al crear turno", error);
        return null;
    }
};

// Actualizar turno
export const updateShift = async (id: string, shift: Partial<Shift>): Promise<Shift | null> => {
    try {
        const response = await api.put<Shift>(`${API_URL}/${id}`, shift);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar turno", error);
        return null;
    }
};

// Eliminar turno
export const deleteShift = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar turno", error);
        return false;
    }
};
