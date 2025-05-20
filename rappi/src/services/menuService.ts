import { Menu } from "../models/menu";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/menus" || "";

// Obtener todos los menus
export const getMenus = async (): Promise<Menu[]> => {
    try {
        const response = await api.get<Menu[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener menus", error);
        return [];
    }
};

// Obtener un menu por ID
export const getMenuById = async (id: string): Promise<Menu | null> => {
    try {
        const response = await api.get<Menu>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Menu no encontrado", error);
        return null;
    }
};

// Crear un nuevo menu
export const createMenu = async (menu: Omit<Menu, "id">): Promise<Menu | null> => {
    try {
        const response = await api.post<Menu>(API_URL, menu);
        return response.data;
    } catch (error) {
        console.error("Error al crear menu", error);
        return null;
    }
};

// Actualizar menu
export const updateMenu = async (id: string, menu: Partial<Menu>): Promise<Menu | null> => {
    try {
        const response = await api.put<Menu>(`${API_URL}/${id}`, menu);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar menu", error);
        return null;
    }
};

// Eliminar menu
export const deleteMenu = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar menu", error);
        return false;
    }
};
