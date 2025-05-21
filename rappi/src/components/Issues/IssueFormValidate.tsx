import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Issue } from "../../models/issue";
import ReferenceSelect from "../ReferenceSelector";

interface IssueFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Issue) => void;
  handleUpdate?: (values: Issue) => void;
  issue?: Issue | null;
}

interface IssueFormValidateState {}

class IssueFormValidate extends Component<IssueFormValidateProps, IssueFormValidateState> {
  validationSchema = Yup.object({
    description: Yup.string().required("La descripción es obligatoria"),
    issue_type: Yup.string().required("El tipo de problema es obligatorio"),
    date_reported: Yup.date()
      .required("La fecha reportada es obligatoria")
      .typeError("La fecha debe ser válida"),
    status: Yup.string().required("El estado es obligatorio"),
    motorcycle_id: Yup.number()
      .typeError("El ID de la motocicleta debe ser un número")
      .required("El ID de la motocicleta es obligatorio"),
  });

  handleSubmit = (values: Issue, actions: FormikHelpers<Issue>) => {
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
    const initialValues: Issue = this.props.issue || {
      id: "",
      description: "",
      issue_type: "",
      date_reported: new Date(),
      status: "",
      motorcycle_id: 0,
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
              {mode} Problema
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Descripción</label>
              <Field
                type="text"
                name="description"
                className={`w-full border ${
                  errors.description && touched.description ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la descripción"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Tipo de Problema</label>
              <Field
                type="text"
                name="issue_type"
                className={`w-full border ${
                  errors.issue_type && touched.issue_type ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el tipo de problema"
              />
              <ErrorMessage
                name="issue_type"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Fecha Reportada</label>
              <Field
                type="date"
                name="date_reported"
                className={`w-full border ${
                  errors.date_reported && touched.date_reported ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="date_reported"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Estado</label>
              <Field
                type="text"
                name="status"
                className={`w-full border ${
                  errors.status && touched.status ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el estado"
              />
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID de Motocicleta</label>
              <ReferenceSelect
                name="motorcycle_id"
                model="motorcycle"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.motorcycle_id && touched.motorcycle_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="motorcycle_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-sm text-gray-600">
              Motocicleta seleccionada: {values.motorcycle_id || "Ninguna"}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Problema`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default IssueFormValidate;
