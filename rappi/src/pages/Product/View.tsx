import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../models/product';
import { getProductById } from '../../services/productService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('ID de producto no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getProductById(Number(id));
            if (data) {
                setProduct(data);
                setError(null);
            } else {
                setError('Producto no encontrado');
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando producto...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Producto" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/product')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Producto" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Producto</h2>
            {product ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Nombre:</span>
                        <span>{product.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Descripción:</span>
                        <span>{product.description || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Precio:</span>
                        <span>{product.price !== undefined ? product.price : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Categoría:</span>
                        <span>{product.category || 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/product/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el producto.</p>
            )}
        </div>
    );
};

export default ViewProductPage;
