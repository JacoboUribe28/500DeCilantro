import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Shift } from "../../models/shift";
import ReferenceSelect from "../ReferenceSelector";

interface ShiftFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Shift) => void;
  handleUpdate?: (values: Shift) => void;
  shift?: Shift | null;
}

interface ShiftFormValidateState {}

class ShiftFormValidate extends Component<ShiftFormValidateProps, ShiftFormValidateState> {
  validationSchema = Yup.object({
    start_time: Yup.date()
      .required("La hora de inicio es obligatoria")
      .typeError("Debe ser una fecha y hora válida"),
    end_time: Yup.date()
      .required("La hora de fin es obligatoria")
      .typeError("Debe ser una fecha y hora válida")
      .min(Yup.ref('start_time'), "La hora de fin debe ser posterior a la hora de inicio"),
    status: Yup.string().required("El estado es obligatorio"),
    driver_id: Yup.number()
      .typeError("El ID del conductor debe ser un número")
      .required("El ID del conductor es obligatorio"),
    motorcycle_id: Yup.number()
      .typeError("El ID de la motocicleta debe ser un número")
      .required("El ID de la motocicleta es obligatorio"),
  });

  handleSubmit = (values: Shift, actions: FormikHelpers<Shift>) => {
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
    const initialValues: Shift = this.props.shift || {
      id: "",
      start_time: undefined,
      end_time: undefined,
      status: "",
      driver_id: undefined,
      motorcycle_id: undefined,
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
              {mode} Turno
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Hora de Inicio</label>
              <Field
                type="datetime-local"
                name="start_time"
                className={`w-full border ${
                  errors.start_time && touched.start_time ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="start_time"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Hora de Fin</label>
              <Field
                type="datetime-local"
                name="end_time"
                className={`w-full border ${
                  errors.end_time && touched.end_time ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="end_time"
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
              <label className="block mb-2 font-semibold text-gray-700">ID del Conductor</label>
              <ReferenceSelect
                name="driver_id"
                model="driver"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.driver_id && touched.driver_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="driver_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID de la Motocicleta</label>
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
              Conductor seleccionado: {values.driver_id || "Ninguno"}
            </div>
            <div className="text-sm text-gray-600">
              Motocicleta seleccionada: {values.motorcycle_id || "Ninguna"}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Turno`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ShiftFormValidate;
