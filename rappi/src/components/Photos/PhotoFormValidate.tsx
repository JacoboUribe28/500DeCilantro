import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Photo } from "../../models/photo";
import ReferenceSelect from "../ReferenceSelector";

interface PhotoFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Photo) => void;
  handleUpdate?: (values: Photo) => void;
  photo?: Photo | null;
}

interface PhotoFormValidateState {}

class PhotoFormValidate extends Component<PhotoFormValidateProps, PhotoFormValidateState> {
  validationSchema = Yup.object({
    image_url: Yup.string()
      .url("Debe ser una URL válida")
      .required("La URL de la imagen es obligatoria"),
    caption: Yup.string().required("El título es obligatorio"),
    taken_at: Yup.date()
      .required("La fecha en que se tomó la foto es obligatoria")
      .typeError("Debe ser una fecha válida"),
    issue_id: Yup.number()
      .typeError("El ID del problema debe ser un número")
      .required("El ID del problema es obligatorio"),
  });

  handleSubmit = (values: Photo, actions: FormikHelpers<Photo>) => {
    console.log("Valores enviados:", values);

    if (this.props.mode === 1 && this.props.handleCreate) {
      this.props.handleCreate(values);
    } else if (this.props.mode === 2 && this.props.handleUpdate) {
      this.props.handleUpdate(values);
    } else {
      console.error("No se proporcionó función para el modo actual");
    }
    actions.setSubmitting(false);
  };

  render() {
    const initialValues: Photo = this.props.photo || {
      id: "",
      image_url: "",
      caption: "",
      taken_at: undefined,
      issue_id: undefined,
    };

    const mode = this.props.mode === 1 ? "Crear" : "Actualizar";

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {mode} Foto
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">URL de la Imagen</label>
              <Field
                type="text"
                name="image_url"
                className={`w-full border ${
                  errors.image_url && touched.image_url ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la URL de la imagen"
              />
              <ErrorMessage
                name="image_url"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Título</label>
              <Field
                type="text"
                name="caption"
                className={`w-full border ${
                  errors.caption && touched.caption ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el título"
              />
              <ErrorMessage
                name="caption"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Fecha de la Foto</label>
              <Field
                type="date"
                name="taken_at"
                className={`w-full border ${
                  errors.taken_at && touched.taken_at ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="taken_at"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID del Problema</label>
              <ReferenceSelect
                name="issue_id"
                model="issue"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.issue_id && touched.issue_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="issue_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-sm text-gray-600">
              Problema seleccionado: {values.issue_id || "Ninguno"}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Foto`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default PhotoFormValidate;
