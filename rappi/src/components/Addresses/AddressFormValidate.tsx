import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Address } from "../../models/address";
import ReferenceSelect from "../ReferenceSelector";

interface AddressFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Address) => void;
  handleUpdate?: (values: Address) => void;
  address?: Address | null;
}

interface AddressFormValidateState {}

class AddressFormValidate extends Component<AddressFormValidateProps, AddressFormValidateState> {
  validationSchema = Yup.object({
    street: Yup.string().required("La calle es obligatoria"),
    city: Yup.string().required("La ciudad es obligatoria"),
    state: Yup.string().required("El estado es obligatorio"),
    postal_code: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener 5 dígitos")
      .required("El código postal es obligatorio"),
    additional_info: Yup.string(),
    order_id: Yup.string().required("El ID del pedido es obligatorio")
  });

  handleSubmit = (values: Address, actions: FormikHelpers<Address>) => {
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
    const initialValues: Address = this.props.address || {
      id: "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      additional_info: "",
      order_id: "",
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
              {mode} Dirección
            </h3>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Calle</label>
              <Field
                type="text"
                name="street"
                className={`w-full border ${
                  errors.street && touched.street ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la calle"
              />
              <ErrorMessage
                name="street"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Ciudad</label>
              <Field
                type="text"
                name="city"
                className={`w-full border ${
                  errors.city && touched.city ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la ciudad"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Estado</label>
              <Field
                type="text"
                name="state"
                className={`w-full border ${
                  errors.state && touched.state ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el estado"
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Código Postal</label>
              <Field
                type="text"
                name="postal_code"
                className={`w-full border ${
                  errors.postal_code && touched.postal_code ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese el código postal"
              />
              <ErrorMessage
                name="postal_code"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Información Adicional</label>
              <Field
                as="textarea"
                name="additional_info"
                className={`w-full border ${
                  errors.additional_info && touched.additional_info ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese información adicional"
                rows={3}
              />
              <ErrorMessage
                name="additional_info"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700">ID de Pedido</label>
              <ReferenceSelect
                name="order_id"
                model="order"
                valueKey="id"
                labelKey="id" // Usamos el ID como etiqueta
                className={`w-full border ${
                  errors.order_id && touched.order_id ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              />
              <ErrorMessage
                name="order_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            {/* Mostramos el valor seleccionado para facilitar la depuración */}
            <div className="text-sm text-gray-600">
              Orden seleccionada: {values.order_id || "Ninguna"}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Dirección`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default AddressFormValidate;