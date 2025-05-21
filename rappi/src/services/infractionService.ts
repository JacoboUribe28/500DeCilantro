import axios from "axios";
import { Infraction } from "../models/Infraction";

const BASE_URL = "https://e1897de6-5263-40d5-be3c-6ad562ea491d.mock.pstmn.io";

export const getInfractions = async (): Promise<Infraction[]> => {
  const { data } = await axios.get(`${BASE_URL}/infringements`);
  return data;
};
