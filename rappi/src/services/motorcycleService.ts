import { Motorcycle } from "../models/motorcycle";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/motorcycles`;

// Obtener todas las motocicletas
export const getMotorcycles = async (): Promise<Motorcycle[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener motocicletas");
    return await response.json(); 
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener una motocicleta por ID
export const getMotorcycleById = async (id: number): Promise<Motorcycle | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Motocicleta no encontrada");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear motocicleta
export const createMotorcycle = async (
  motorcycle: Omit<Motorcycle, "id">
): Promise<Motorcycle | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(motorcycle),
    });
    if (!response.ok) throw new Error("Error al crear motocicleta");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar motocicleta
export const updateMotorcycle = async (
  id: number,
  motorcycle: Partial<Motorcycle>
): Promise<Motorcycle | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(motorcycle),
    });
    if (!response.ok) throw new Error("Error al actualizar motocicleta");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar motocicleta
export const deleteMotorcycle = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar motocicleta");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 🚀 Iniciar rastreo
export const startTracking = async (
  plate: string,
  lat: number,
  lng: number
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/track/${plate}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng }),
    });
    if (!response.ok) throw new Error("Error al iniciar rastreo");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 🛑 Detener rastreo
export const stopTracking = async (plate: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/stop/${plate}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Error al detener rastreo");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 📍 Obtener ubicación actual
export const getMotorcycleLocation = async (
  plate: string
): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(`${API_URL}/track/${plate}`);
    if (!response.ok) throw new Error("Ubicación no disponible");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
