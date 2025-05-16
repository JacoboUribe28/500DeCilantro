import React from "react";
import { Shift } from "../../models/shift";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface ShiftFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Shift) => void;
    handleUpdate?: (values: Shift) => void;
    shift?: Shift | null;
}

const ShiftFormValidate: React.FC<ShiftFormProps> = ({ mode, handleCreate, handleUpdate, shift }) => {

    const handleSubmit = (formattedValues: Shift) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No se proporcionó función para el modo actual');
        }
    };

    return (
        <Formik
            initialValues={shift ? shift : {
                start_time: "",
                end_time: "",
                status: "",
                driver_id: 0,
                motorcycle_id: 0,
            }}
            validationSchema={Yup.object({
                start_time: Yup.date()
                    .typeError("Fecha y hora inválidas")
                    .required("La hora de inicio es obligatoria"),
                end_time: Yup.date()
                    .typeError("Fecha y hora inválidas")
                    .required("La hora de fin es obligatoria"),
                status: Yup.string().required("El estado es obligatorio"),
                driver_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID del conductor es obligatorio"),
                motorcycle_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID de la motocicleta es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues = {
                    ...values,
                    start_time: values.start_time ? new Date(values.start_time) : undefined,
                    end_time: values.end_time ? new Date(values.end_time) : undefined,
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Hora de inicio */}
                    <div>
                        <label htmlFor="start_time" className="block text-lg font-medium text-gray-700">Hora de inicio</label>
                        <Field type="datetime-local" name="start_time" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="start_time" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Hora de fin */}
                    <div>
                        <label htmlFor="end_time" className="block text-lg font-medium text-gray-700">Hora de fin</label>
                        <Field type="datetime-local" name="end_time" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="end_time" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field type="text" name="status" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* ID del conductor */}
                    <div>
                        <label htmlFor="driver_id" className="block text-lg font-medium text-gray-700">ID del conductor</label>
                        <Field type="number" name="driver_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="driver_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* ID de la motocicleta */}
                    <div>
                        <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">ID de la motocicleta</label>
                        <Field type="number" name="motorcycle_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ShiftFormValidate;
