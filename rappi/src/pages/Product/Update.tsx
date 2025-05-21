import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getProductById, updateProduct } from "../../services/productService";
import Swal from "sweetalert2";

import { Product } from '../../models/product';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateProductPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            const productData = await getProductById(id);
            setProduct(productData);
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => {
            if (!prev) return prev;
            if (name === "price") {
                const numValue = value === "" ? undefined : Number(value);
                return { ...prev, [name]: numValue };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !product.id) {
            Swal.fire({
                title: "Error",
                text: "Producto no cargado correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
            return;
        }

        try {
            const updated = await updateProduct(product.id, product);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el producto",
                    icon: "success",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/product/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el producto",
                    icon: "error",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el producto",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Producto" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Producto
                    </h3>
                    <form onSubmit={handleUpdateProduct} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Descripción:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={product.description || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Precio:
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price !== undefined ? product.price : ''}
                                onChange={handleChange}
                                required
                                min={0}
                                step="0.01"
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Categoría:
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={product.category || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Producto
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/product/list")}
                            className="mt-2 inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            Volver a la lista
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProductPage;
