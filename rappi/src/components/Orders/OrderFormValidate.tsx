import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Order } from "../../models/order";
import ReferenceSelect from "../ReferenceSelector";

interface OrderFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Order) => void;
  handleUpdate?: (values: Order) => void;
  order?: Order | null;
}

interface OrderFormValidateState {}

class OrderFormValidate extends Component<OrderFormValidateProps, OrderFormValidateState> {
  validationSchema = Yup.object({
    quantity: Yup.number()
      .typeError("La cantidad debe ser un número")
      .required("La cantidad es obligatoria")
      .min(1, "La cantidad debe ser al menos 1"),
    total_price: Yup.number()
      .typeError("El precio total debe ser un número")
      .required("El precio total es obligatorio")
      .min(0, "El precio total no puede ser negativo"),
    status: Yup.string().required("El estado es obligatorio"),
    customer_id: Yup.number()
      .typeError("El ID del cliente debe ser un número")
      .required("El ID del cliente es obligatorio"),
    menu_id: Yup.number()
      .typeError("El ID del menú debe ser un número")
      .required("El ID del menú es obligatorio"),
    motorcycle_id: Yup.number()
      .typeError("El ID de la motocicleta debe ser un número")
      .required("El ID de la motocicleta es obligatorio"),
  });

  handleSubmit = (values: Order, actions: FormikHelpers<Order>) => {
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
    const initialValues: Order = this.props.order || {
      id: "",
      quantity: 1,
      total_price: 0,
      status: "",
      customer_id: undefined,
      menu_id: undefined,
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
              {mode} Pedido
            </h3>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Cantidad</label>
              <Field
                type="number"
                name="quantity"
                className={`w-full border ${
                  errors.quantity && touched.quantity ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la cantidad"
                min="1"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Precio Total</label>
              <Field
                type="number"
                name="total_price"
                className={`w-full border ${
                  errors.total_price && touched.total_price ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el precio total"
                min="0"
                step="0.01"
              />
              <ErrorMessage
                name="total_price"
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
              <label className="block mb-2 font-semibold text-gray-700">ID del Cliente</label>
              <ReferenceSelect
                name="customer_id"
                model="customer"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.customer_id && touched.customer_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="customer_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID del Menú</label>
              <ReferenceSelect
                name="menu_id"
                model="menu"
                valueKey="id"
                labelKey="id"
                className={`w-full border ${
                  errors.menu_id && touched.menu_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="menu_id"
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
              Cliente seleccionado: {values.customer_id || "Ninguno"}
            </div>
            <div className="text-sm text-gray-600">
              Menú seleccionado: {values.menu_id || "Ninguno"}
            </div>
            <div className="text-sm text-gray-600">
              Motocicleta seleccionada: {values.motorcycle_id || "Ninguna"}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Pedido`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default OrderFormValidate;
