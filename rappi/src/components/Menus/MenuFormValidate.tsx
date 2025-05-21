import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Menu } from "../../models/menu";
import ReferenceSelect from "../ReferenceSelector";

interface MenuFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Menu) => void;
  handleUpdate?: (values: Menu) => void;
  menu?: Menu | null;
}

interface MenuFormValidateState {}

class MenuFormValidate extends Component<MenuFormValidateProps, MenuFormValidateState> {
  validationSchema = Yup.object({
    price: Yup.number()
      .typeError("El precio debe ser un número")
      .required("El precio es obligatorio")
      .min(0, "El precio no puede ser negativo"),
    availbality: Yup.boolean().required("La disponibilidad es obligatoria"),
    restaurant_id: Yup.number()
      .typeError("El ID del restaurante debe ser un número")
      .required("El ID del restaurante es obligatorio"),
    product_id: Yup.number()
      .typeError("El ID del producto debe ser un número")
      .required("El ID del producto es obligatorio"),
  });

  handleSubmit = (values: Menu, actions: FormikHelpers<Menu>) => {
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
    const initialValues: Menu = this.props.menu || {
      id: "",
      price: 0,
      availbality: false,
      restaurant_id: undefined,
      product_id: undefined,
    };

    const mode = this.props.mode === 1 ? "Crear" : "Actualizar";

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {mode} Menú
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Precio</label>
              <Field
                type="number"
                name="price"
                className={`w-full border ${
                  errors.price && touched.price ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el precio"
                min="0"
                step="0.01"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                name="availbality"
                id="availbality"
                checked={values.availbality}
                onChange={() => setFieldValue("availbality", !values.availbality)}
                className={`border ${
                  errors.availbality && touched.availbality ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <label htmlFor="availbality" className="font-semibold text-gray-700">
                Disponible
              </label>
            </div>
            <ErrorMessage
              name="availbality"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID del Restaurante</label>
              <ReferenceSelect
                name="restaurant_id"
                model="restaurant"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.restaurant_id && touched.restaurant_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="restaurant_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID del Producto</label>
              <ReferenceSelect
                name="product_id"
                model="product"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.product_id && touched.product_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="product_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="text-sm text-gray-600">
              Restaurante seleccionado: {values.restaurant_id || "Ninguno"}
            </div>
            <div className="text-sm text-gray-600">
              Producto seleccionado: {values.product_id || "Ninguno"}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Menú`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default MenuFormValidate;
