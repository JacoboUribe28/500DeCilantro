import React from "react";
import { Driver } from "../../models/driver";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface DriverFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Driver) => void;
    handleUpdate?: (values: Driver) => void;
    driver?: Driver | null;
}

const DriverFormValidate: React.FC<DriverFormProps> = ({ mode, handleCreate, handleUpdate, driver }) => {

    const handleSubmit = (formattedValues: Driver) => {
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
            initialValues={driver ? driver : {
                name: "",
                license_number: "",
                email: "",
                phone: "",
                status: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("El nombre es obligatorio"),
                license_number: Yup.string().required("El número de licencia es obligatorio"),
                email: Yup.string().email("Email inválido").required("El email es obligatorio"),
                phone: Yup.string()
                    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
                    .required("El teléfono es obligatorio"),
                status: Yup.string().required("El estado es obligatorio"),
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
                        <Field type="text" name="name" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Número de licencia */}
                    <div>
                        <label htmlFor="license_number" className="block text-lg font-medium text-gray-700">Número de licencia</label>
                        <Field type="text" name="license_number" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="license_number" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo electrónico</label>
                        <Field type="email" name="email" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
                        <Field type="text" name="phone" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
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

export default DriverFormValidate;
