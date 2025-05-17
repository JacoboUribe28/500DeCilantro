import React, { useState } from 'react';
import { Product } from '../../models/product';
import { createProduct } from '../../services/productService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const ProductForm: React.FC<{ handleCreate: (product: Omit<Product, 'id'>) => void }> = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [category, setCategory] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            name,
            description,
            price: price === '' ? undefined : price,
            category,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Precio</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    min={0}
                    step="0.01"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Categoría</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                navigate('/products');
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
