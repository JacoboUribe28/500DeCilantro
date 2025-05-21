import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Product } from "../../models/product";

interface ProductFormValidateProps {
  mode: number; // 1 = create, 2 = update
  handleCreate?: (values: Product) => void;
  handleUpdate?: (values: Product) => void;
  product?: Product | null;
}

interface ProductFormValidateState {}

class ProductFormValidate extends Component<ProductFormValidateProps, ProductFormValidateState> {
  validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    price: Yup.number()
      .typeError("El precio debe ser un número")
      .required("El precio es obligatorio")
      .min(0, "El precio no puede ser negativo"),
    category: Yup.string().required("La categoría es obligatoria"),
  });

  handleSubmit = (values: Product, actions: FormikHelpers<Product>) => {
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
    const initialValues: Product = this.props.product || {
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
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
              {mode} Producto
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
              <label className="block mb-2 font-semibold text-gray-700">Descripción</label>
              <Field
                as="textarea"
                name="description"
                className={`w-full border ${
                  errors.description && touched.description ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la descripción"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

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

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Categoría</label>
              <Field
                type="text"
                name="category"
                className={`w-full border ${
                  errors.category && touched.category ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Ingrese la categoría"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `${mode} Producto`}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ProductFormValidate;
