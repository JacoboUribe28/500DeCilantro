import React, { useState } from 'react';
import { Product } from '../../models/product';
import { createProduct } from '../../services/productService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const ProductForm: React.FC<{ handleCreate: (product: Omit<Product, 'id'>) => void }> = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            name,
            description,
            price: price ? Number(price) : undefined,
            category,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Producto</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el nombre"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la descripción"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Precio</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el precio"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Categoría</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la categoría"
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Producto
            </button>
        </form>
    );
};

const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateProduct = async (product: Omit<Product, 'id'>) => {
        try {
            const createdProduct = await createProduct(product);
            if (createdProduct) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el producto',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Producto creado con éxito:', createdProduct);
                navigate('/product/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el producto',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el producto',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Producto</h2>
            <Breadcrumb pageName="Crear Producto" />
            <ProductForm handleCreate={handleCreateProduct} />
        </div>
    );
};

export default CreateProductPage;
