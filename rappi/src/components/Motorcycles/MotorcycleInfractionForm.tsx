import React from "react";
import { useForm } from "react-hook-form";
import { MotorcycleInfraction } from "../../models/MotorcycleInfraction";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  mode: 1 | 2; // 1 = Crear, 2 = Editar (opcional para reuso)
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

  const onSubmit = (data: MotorcycleInfraction) => {
    handleCreate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>ID de la Moto</label>
        <input type="number" {...register("idMoto")} className="border p-2 w-full" />
        {errors.idMoto && <p className="text-red-500 text-sm">{errors.idMoto.message}</p>}
      </div>

      <div>
        <label>ID de la Infracción</label>
        <input type="number" {...register("idInfraccion")} className="border p-2 w-full" />
        {errors.idInfraccion && <p className="text-red-500 text-sm">{errors.idInfraccion.message}</p>}
      </div>

      <div>
        <label>Fecha</label>
        <input type="date" {...register("fecha")} className="border p-2 w-full" />
        {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {mode === 1 ? "Registrar Infracción" : "Actualizar"}
      </button>
    </form>
  );
};

export default MotorcycleInfractionForm;
