import React from "react";
import { Order } from "../../models/order";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface OrderFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Order) => void;
    handleUpdate?: (values: Order) => void;
    order?: Order | null;
}

const OrderFormValidate: React.FC<OrderFormProps> = ({ mode, handleCreate, handleUpdate, order }) => {

    const handleSubmit = (formattedValues: Order) => {
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
            initialValues={order ? order : {
                quantity: 0,
                total_price: 0,
                status: "",
                customer_id: 0,
                menu_id: 0,
                motorcycle_id: 0,
            }}
            validationSchema={Yup.object({
                quantity: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("La cantidad es obligatoria"),
                total_price: Yup.number()
                    .typeError("Debe ser un número")
                    .positive("Debe ser un número positivo")
                    .required("El precio total es obligatorio"),
                status: Yup.string().required("El estado es obligatorio"),
                customer_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID del cliente es obligatorio"),
                menu_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID del menú es obligatorio"),
                motorcycle_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID de la motocicleta es obligatorio"),
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Cantidad */}
                    <div>
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Cantidad</label>
                        <Field type="number" name="quantity" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Precio total */}
                    <div>
                        <label htmlFor="total_price" className="block text-lg font-medium text-gray-700">Precio total</label>
                        <Field type="number" name="total_price" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="total_price" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field type="text" name="status" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* ID del cliente */}
                    <div>
                        <label htmlFor="customer_id" className="block text-lg font-medium text-gray-700">ID del cliente</label>
                        <Field type="number" name="customer_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="customer_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* ID del menú */}
                    <div>
                        <label htmlFor="menu_id" className="block text-lg font-medium text-gray-700">ID del menú</label>
                        <Field type="number" name="menu_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="menu_id" component="p" className="text-red-500 text-sm" />
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

export default OrderFormValidate;
