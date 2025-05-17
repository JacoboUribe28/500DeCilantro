import React from "react";
import { Menu } from "../../models/menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface MenuFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Menu) => void;
    handleUpdate?: (values: Menu) => void;
    menu?: Menu | null;
}

const MenuFormValidate: React.FC<MenuFormProps> = ({ mode, handleCreate, handleUpdate, menu }) => {

    const handleSubmit = (formattedValues: Menu) => {
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
            initialValues={menu ? menu : {
                price: 0,
                availbality: false,
                restaurant_id: 0,
                product_id: 0,
            }}
            validationSchema={Yup.object({
                price: Yup.number()
                    .typeError("Debe ser un número")
                    .positive("Debe ser un número positivo")
                    .required("El precio es obligatorio"),
                availbality: Yup.boolean().required("La disponibilidad es obligatoria"),
                restaurant_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID del restaurante es obligatorio"),
                product_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID del producto es obligatorio"),
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Precio */}
                    <div>
                        <label htmlFor="price" className="block text-lg font-medium text-gray-700">Precio</label>
                        <Field type="number" name="price" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Disponibilidad */}
                    <div className="flex items-center">
                        <Field type="checkbox" name="availbality" className="mr-2" />
                        <label htmlFor="availbality" className="text-lg font-medium text-gray-700">Disponible</label>
                    </div>

                    {/* ID del restaurante */}
                    <div>
                        <label htmlFor="restaurant_id" className="block text-lg font-medium text-gray-700">ID del restaurante</label>
                        <Field type="number" name="restaurant_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="restaurant_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* ID del producto */}
                    <div>
                        <label htmlFor="product_id" className="block text-lg font-medium text-gray-700">ID del producto</label>
                        <Field type="number" name="product_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="product_id" component="p" className="text-red-500 text-sm" />
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

export default MenuFormValidate;
