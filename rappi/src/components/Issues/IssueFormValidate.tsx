import React from "react";
import { Issue } from "../../models/issue";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface IssueFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Issue) => void;
    handleUpdate?: (values: Issue) => void;
    issue?: Issue | null;
}

const IssueFormValidate: React.FC<IssueFormProps> = ({ mode, handleCreate, handleUpdate, issue }) => {

    const handleSubmit = (formattedValues: Issue) => {
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
            initialValues={issue ? issue : {
                description: "",
                issue_type: "",
                date_reported: "",
                status: "",
                motorcycle_id: "",
            }}
            validationSchema={Yup.object({
                description: Yup.string().required("La descripción es obligatoria"),
                issue_type: Yup.string().required("El tipo de problema es obligatorio"),
                date_reported: Yup.date()
                    .typeError("Fecha inválida")
                    .required("La fecha de reporte es obligatoria"),
                status: Yup.string().required("El estado es obligatorio"),
                motorcycle_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID de la motocicleta es obligatorio"),
            })}
            onSubmit={(values) => {
                // Convert motorcycle_id to number if it's a string
                const formattedValues = {
                    ...values,
                    motorcycle_id: Number(values.motorcycle_id),
                    date_reported: values.date_reported? new Date(values.date_reported): undefined,
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
                        <Field type="text" name="description" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Tipo de problema */}
                    <div>
                        <label htmlFor="issue_type" className="block text-lg font-medium text-gray-700">Tipo de problema</label>
                        <Field type="text" name="issue_type" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="issue_type" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Fecha de reporte */}
                    <div>
                        <label htmlFor="date_reported" className="block text-lg font-medium text-gray-700">Fecha de reporte</label>
                        <Field type="date" name="date_reported" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="date_reported" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field type="text" name="status" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
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

export default IssueFormValidate;
