// src/services/trackingService.ts
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const startTracking = async (plate: string) => {
  const response = await axios.post(`${BASE_URL}/motorcycles/track/${plate}`);
  return response.data;
};

export const getLastCoordinates = async (plate: string) => {
  // Simulación temporal: reemplazar por WS o endpoint real si lo habilitas
  const coords = await axios.get(`${BASE_URL}/coordinates/${plate}`);
  return coords.data; // { lat: number, lng: number }
};
