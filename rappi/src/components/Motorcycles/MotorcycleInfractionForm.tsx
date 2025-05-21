import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MotorcycleInfraction } from "../../models/MotorcycleInfraction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MotorcycleInfractionManager } from "../../core/MotorcycleInfractionManager";
import { Motorcycle } from "../../models/motorcycle";
import { Infraction } from "../../models/Infraction";

interface Props {
  mode: 1 | 2;
  handleCreate: (data: MotorcycleInfraction) => void;
}

const schema = yup.object().shape({
  idMoto: yup.number().required("El ID de la moto es obligatorio"),
  idInfraccion: yup.number().required("El ID de la infracción es obligatorio"),
  fecha: yup.string().required("La fecha es obligatoria"),
});

const MotorcycleInfractionForm: React.FC<Props> = ({ mode, handleCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MotorcycleInfraction>({
    resolver: yupResolver(schema),
  });

  const [motos, setMotos] = useState<Motorcycle[]>([]);
  const [multas, setMultas] = useState<Infraction[]>([]);

  useEffect(() => {
    MotorcycleInfractionManager.obtenerMotos().then(setMotos);
    MotorcycleInfractionManager.obtenerMultas().then(setMultas);
  }, []);

  const onSubmit = (data: MotorcycleInfraction) => {
    handleCreate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Moto</label>
        <select {...register("idMoto")} className="border p-2 w-full">
          <option value="">Seleccione una moto</option>
          {motos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.license_plate} - {m.brand}
            </option>
          ))}
        </select>
        {errors.idMoto && <p className="text-red-500 text-sm">{errors.idMoto.message}</p>}
      </div>

      <div>
        <label>Infracción</label>
        <select {...register("idInfraccion")} className="border p-2 w-full">
          <option value="">Seleccione una infracción</option>
          {multas.map((inf) => (
            <option key={inf.id} value={inf.id}>
              {inf.id} - {inf.name}
            </option>
          ))}
        </select>
        {errors.idInfraccion && <p className="text-red-500 text-sm">{errors.idInfraccion.message}</p>}
      </div>

      <div>
        <label>Fecha</label>
        <input type="date" {...register("fecha")} className="border p-2 w-full" />
        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha.message}</p>}
      </div>

      <button type="submit" className="bg-blue text-black px-4 py-2 rounded">
        Crear la infracción de la moto
      </button>
    </form>
  );
};

export default MotorcycleInfractionForm;
