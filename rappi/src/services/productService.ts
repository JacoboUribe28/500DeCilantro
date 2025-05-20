import { Product } from "../models/product";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/products" || "";

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos", error);
        return [];
    }
};

// Obtener un producto por ID
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await api.get<Product>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Producto no encontrado", error);
        return null;
    }
};

// Crear un nuevo producto
export const createProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    try {
        const response = await api.post<Product>(API_URL, product);
        return response.data;
    } catch (error) {
        console.error("Error al crear producto", error);
        return null;
    }
};

// Actualizar producto
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await api.put<Product>(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto", error);
        return null;
    }
};

// Eliminar producto
export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar producto", error);
        return false;
    }
};
