import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Address } from "../../models/address";

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
    order_id: Yup.string(),
  });

  handleSubmit = (values: Address, actions: FormikHelpers<Address>) => {
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
      street: "",
      city: "",
      state: "",
      postal_code: "",
      additional_info: "",
      order_id: "",
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
      >
        {( { handleSubmit, isSubmitting }: { handleSubmit: React.FormEventHandler<HTMLFormElement>; isSubmitting: boolean } ) => (
          <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
            {/* Calle */}
            <div>
              <label htmlFor="street" className="block text-lg font-medium text-gray-700">Calle</label>
              <Field type="text" name="street" className="w-full border rounded-md p-2" />
              <ErrorMessage name="street" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Ciudad */}
            <div>
              <label htmlFor="city" className="block text-lg font-medium text-gray-700">Ciudad</label>
              <Field type="text" name="city" className="w-full border rounded-md p-2" />
              <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="state" className="block text-lg font-medium text-gray-700">Estado</label>
              <Field type="text" name="state" className="w-full border rounded-md p-2" />
              <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Código Postal */}
            <div>
              <label htmlFor="postal_code" className="block text-lg font-medium text-gray-700">Código Postal</label>
              <Field type="text" name="postal_code" className="w-full border rounded-md p-2" />
              <ErrorMessage name="postal_code" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Información Adicional */}
            <div>
              <label htmlFor="additional_info" className="block text-lg font-medium text-gray-700">Información Adicional</label>
              <Field as="textarea" name="additional_info" className="w-full border rounded-md p-2" />
              <ErrorMessage name="additional_info" component="p" className="text-red-500 text-sm" />
            </div>

            {/* ID de Pedido */}
            <div>
              <label htmlFor="order_id" className="block text-lg font-medium text-gray-700">ID de Pedido</label>
              <Field type="text" name="order_id" className="w-full border rounded-md p-2" />
              <ErrorMessage name="order_id" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Botón de enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-4 text-white rounded-md ${
                this.props.mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {this.props.mode === 1 ? "Crear" : "Actualizar"}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default AddressFormValidate;
