import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Restaurant } from "../../models/restaurant";

interface RestaurantFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Restaurant) => void;
  handleUpdate?: (values: Restaurant) => void;
  restaurant?: Restaurant | null;
}

interface RestaurantFormValidateState {}

class RestaurantFormValidate extends Component<RestaurantFormValidateProps, RestaurantFormValidateState> {
  validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("Debe ser un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
  });

  handleSubmit = (values: Restaurant, actions: FormikHelpers<Restaurant>) => {
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
    const initialValues: Restaurant = this.props.restaurant || {
      id: "",
      name: "",
      address: "",
      phone: "",
      email: "",
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
              {mode} Restaurante
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
              <Field
                type="text"
                name="name"
                className={`w-full border ${
                  errors.name && touched.name ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el nombre"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Dirección</label>
              <Field
                type="text"
                name="address"
                className={`w-full border ${
                  errors.address && touched.address ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la dirección"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Teléfono</label>
              <Field
                type="text"
                name="phone"
                className={`w-full border ${
                  errors.phone && touched.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el teléfono"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Correo Electrónico</label>
              <Field
                type="email"
                name="email"
                className={`w-full border ${
                  errors.email && touched.email ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el correo electrónico"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Restaurante`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default RestaurantFormValidate;
