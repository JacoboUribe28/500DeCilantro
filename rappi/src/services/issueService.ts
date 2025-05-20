import { Issue } from "../models/issue";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/issues" || "";

// Obtener todos los issues
export const getIssues = async (): Promise<Issue[]> => {
    try {
        const response = await api.get<Issue[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener issues", error);
        return [];
    }
};

// Obtener un issue por ID
export const getIssueById = async (id: string): Promise<Issue | null> => {
    try {
        const response = await api.get<Issue>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Issue no encontrado", error);
        return null;
    }
};

// Crear un nuevo issue
export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue | null> => {
    try {
        const response = await api.post<Issue>(API_URL, issue);
        return response.data;
    } catch (error) {
        console.error("Error al crear issue", error);
        return null;
    }
};

// Actualizar issue
export const updateIssue = async (id: string, issue: Partial<Issue>): Promise<Issue | null> => {
    try {
        const response = await api.put<Issue>(`${API_URL}/${id}`, issue);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar issue", error);
        return null;
    }
};

// Eliminar issue
export const deleteIssue = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar issue", error);
        return false;
    }
};
