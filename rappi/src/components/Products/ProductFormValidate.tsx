import React from "react";
import { Product } from "../../models/product";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface ProductFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Product) => void;
    handleUpdate?: (values: Product) => void;
    product?: Product | null;
}

const ProductFormValidate: React.FC<ProductFormProps> = ({ mode, handleCreate, handleUpdate, product }) => {

    const handleSubmit = (formattedValues: Product) => {
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
            initialValues={product ? product : {
                name: "",
                description: "",
                price: 0,
                category: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("El nombre es obligatorio"),
                description: Yup.string().required("La descripción es obligatoria"),
                price: Yup.number()
                    .typeError("Debe ser un número")
                    .positive("Debe ser un número positivo")
                    .required("El precio es obligatorio"),
                category: Yup.string().required("La categoría es obligatoria"),
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

                    {/* Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
                        <Field type="text" name="description" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Precio */}
                    <div>
                        <label htmlFor="price" className="block text-lg font-medium text-gray-700">Precio</label>
                        <Field type="number" name="price" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label htmlFor="category" className="block text-lg font-medium text-gray-700">Categoría</label>
                        <Field type="text" name="category" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="category" component="p" className="text-red-500 text-sm" />
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

export default ProductFormValidate;
