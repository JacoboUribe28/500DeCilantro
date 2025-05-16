import React from "react";
import { Photo } from "../../models/photo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface PhotoFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Photo) => void;
    handleUpdate?: (values: Photo) => void;
    photo?: Photo | null;
}

const PhotoFormValidate: React.FC<PhotoFormProps> = ({ mode, handleCreate, handleUpdate, photo }) => {

    const handleSubmit = (formattedValues: Photo) => {
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
            initialValues={photo ? photo : {
                image_url: "",
                caption: "",
                taken_at: "",
                issue_id: 0,
            }}
            validationSchema={Yup.object({
                image_url: Yup.string().url("URL inválida").required("La URL de la imagen es obligatoria"),
                caption: Yup.string().required("El pie de foto es obligatorio"),
                taken_at: Yup.date()
                    .typeError("Fecha inválida")
                    .required("La fecha en que se tomó la foto es obligatoria"),
                issue_id: Yup.number()
                    .typeError("Debe ser un número")
                    .integer("Debe ser un número entero")
                    .positive("Debe ser un número positivo")
                    .required("El ID del problema es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues = {
                    ...values,
                    taken_at: values.taken_at ? new Date(values.taken_at) : undefined,
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* URL de la imagen */}
                    <div>
                        <label htmlFor="image_url" className="block text-lg font-medium text-gray-700">URL de la imagen</label>
                        <Field type="text" name="image_url" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="image_url" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Pie de foto */}
                    <div>
                        <label htmlFor="caption" className="block text-lg font-medium text-gray-700">Pie de foto</label>
                        <Field type="text" name="caption" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="caption" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Fecha tomada */}
                    <div>
                        <label htmlFor="taken_at" className="block text-lg font-medium text-gray-700">Fecha tomada</label>
                        <Field type="date" name="taken_at" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="taken_at" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* ID del problema */}
                    <div>
                        <label htmlFor="issue_id" className="block text-lg font-medium text-gray-700">ID del problema</label>
                        <Field type="number" name="issue_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="issue_id" component="p" className="text-red-500 text-sm" />
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

export default PhotoFormValidate;
