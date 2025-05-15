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
            const productData = await getProductById(parseInt(id));
            setProduct(productData);
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => prev ? { ...prev, [name]: name === 'price' ? Number(value) : value } : prev);
    };

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !product.id) {
            Swal.fire({
                title: "Error",
                text: "Producto no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateProduct(parseInt(product.id), product);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el producto",
                    icon: "success",
                    timer: 3000
                });
                navigate("/products");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el producto",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el producto",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Producto" />
            <form onSubmit={handleUpdateProduct}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price ?? ''}
                        onChange={handleChange}
                        required
                        min={0}
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoría:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Producto</button>
            </form>
        </>
    );
};

export default UpdateProductPage;
