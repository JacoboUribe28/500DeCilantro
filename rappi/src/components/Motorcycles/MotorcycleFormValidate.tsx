import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Motorcycle } from "../../models/motorcycle";

interface MotorcycleFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Motorcycle) => void;
  handleUpdate?: (values: Motorcycle) => void;
  motorcycle?: Motorcycle | null;
}

interface MotorcycleFormValidateState {}

class MotorcycleFormValidate extends Component<MotorcycleFormValidateProps, MotorcycleFormValidateState> {
  validationSchema = Yup.object({
    license_plate: Yup.string().required("La placa es obligatoria"),
    brand: Yup.string().required("La marca es obligatoria"),
    year: Yup.number()
      .typeError("El año debe ser un número")
      .required("El año es obligatorio")
      .min(1900, "El año no puede ser menor a 1900")
      .max(new Date().getFullYear(), "El año no puede ser mayor al año actual"),
    status: Yup.string().required("El estado es obligatorio"),
  });

  handleSubmit = (values: Motorcycle, actions: FormikHelpers<Motorcycle>) => {
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
    const initialValues: Motorcycle = this.props.motorcycle || {
      id: "",
      license_plate: "",
      brand: "",
      year: undefined,
      status: "",
    };

    const mode = this.props.mode === 1 ? "Crear" : "Actualizar";

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {mode} Motocicleta
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Placa</label>
              <Field
                type="text"
                name="license_plate"
                className={`w-full border ${
                  errors.license_plate && touched.license_plate ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la placa"
              />
              <ErrorMessage
                name="license_plate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Marca</label>
              <Field
                type="text"
                name="brand"
                className={`w-full border ${
                  errors.brand && touched.brand ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la marca"
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Año</label>
              <Field
                type="number"
                name="year"
                className={`w-full border ${
                  errors.year && touched.year ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el año"
                min="1900"
                max={new Date().getFullYear()}
              />
              <ErrorMessage
                name="year"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Motocicleta`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default MotorcycleFormValidate;
