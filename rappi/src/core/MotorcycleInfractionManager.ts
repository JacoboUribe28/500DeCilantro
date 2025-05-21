import {
  createMotorcycleInfraction,
  updateMotorcycleInfraction,
} from "../services/motorcycleInfractionService";
import { getMotorcycles } from "../services/motorcycleService";
import { getInfractions } from "../services/infractionService";
import { MotorcycleInfraction } from "../models/MotorcycleInfraction";
import { Motorcycle } from "../models/motorcycle";
import { Infraction } from "../models/Infraction";

export class MotorcycleInfractionManager {
  static async registrar(data: MotorcycleInfraction) {
    return await createMotorcycleInfraction(data);
  }

  static async actualizar(id: number, data: Partial<MotorcycleInfraction>) {
    return await updateMotorcycleInfraction(id, data);
  }

  static async obtenerMotos(): Promise<Motorcycle[]> {
    return await getMotorcycles();
  }

  static async obtenerMultas(): Promise<Infraction[]> {
    return await getInfractions();
  }
}
