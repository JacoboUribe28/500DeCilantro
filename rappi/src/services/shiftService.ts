import { Shift } from "../models/shift";

const API_URL = import.meta.env.VITE_API_URL + "/shifts" || ""; // Reemplaza con la URL real

// Obtener todos los turnos
export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener turnos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un turno por ID
export const getShiftById = async (id: number): Promise<Shift | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Turno no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo turno
export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shift),
        });
        if (!response.ok) throw new Error("Error al crear turno");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar turno
export const updateShift = async (id: number, shift: Partial<Shift>): Promise<Shift | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shift),
        });
        if (!response.ok) throw new Error("Error al actualizar turno");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar turno
export const deleteShift = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar turno");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
