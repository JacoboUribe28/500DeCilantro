import axios from "axios";
import { MotorcycleInfraction } from "../models/MotorcycleInfraction";

const BASE_URL = "https://e1897de6-5263-40d5-be3c-6ad562ea491d.mock.pstmn.io";

export const createMotorcycleInfraction = async (data: MotorcycleInfraction) => {
  const res = await axios.post(`${BASE_URL}/motorcycle-infringement`, data);
  return res.data;
};

export const updateMotorcycleInfraction = async (
  id: number,
  data: Partial<MotorcycleInfraction>
) => {
  const res = await axios.put(`${BASE_URL}/motorcycle-infringement/${id}`, data);
  return res.data;
};
