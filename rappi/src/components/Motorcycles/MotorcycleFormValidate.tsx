import React from "react";
import { Motorcycle } from "../../models/motorcycle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface MotorcycleFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Motorcycle) => void;
    handleUpdate?: (values: Motorcycle) => void;
    motorcycle?: Motorcycle | null;
}

const MotorcycleFormValidate: React.FC<MotorcycleFormProps> = ({ mode, handleCreate, handleUpdate, motorcycle }) => {

    const handleSubmit = (formattedValues: Motorcycle) => {
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
            initialValues={motorcycle ? motorcycle : {
                license_plate: "",
                brand: "",
                year: "",
                status: "",
            }}
            validationSchema={Yup.object({
                license_plate: Yup.string().required("La placa es obligatoria"),
                brand: Yup.string().required("La marca es obligatoria"),
                year: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El año es obligatorio"),
                status: Yup.string().required("El estado es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues = {
                    ...values,
                    year: Number(values.year),
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Placa */}
                    <div>
                        <label htmlFor="license_plate" className="block text-lg font-medium text-gray-700">Placa</label>
                        <Field type="text" name="license_plate" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="license_plate" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Marca */}
                    <div>
                        <label htmlFor="brand" className="block text-lg font-medium text-gray-700">Marca</label>
                        <Field type="text" name="brand" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="brand" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Año */}
                    <div>
                        <label htmlFor="year" className="block text-lg font-medium text-gray-700">Año</label>
                        <Field type="number" name="year" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="year" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field type="text" name="status" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
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

export default MotorcycleFormValidate;
