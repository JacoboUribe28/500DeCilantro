import React, { useState } from 'react';
import { Menu } from '../../models/menu';
import { createMenu } from '../../services/menuService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const MenuForm: React.FC<{ handleCreate: (menu: Omit<Menu, 'id'>) => void }> = ({ handleCreate }) => {
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(false);
    const [restaurantId, setRestaurantId] = useState('');
    const [productId, setProductId] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            price: price ? Number(price) : undefined,
            availbality: availability,
            restaurant_id: restaurantId ? Number(restaurantId) : undefined,
            product_id: productId ? Number(productId) : undefined,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Menú</h3>
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
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    id="availability"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="availability" className="font-semibold text-gray-700">
                    Disponible
                </label>
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID del Restaurante</label>
                <input
                    type="number"
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID del restaurante"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID del Producto</label>
                <input
                    type="number"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID del producto"
                    required
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Menú
            </button>
        </form>
    );
};

const CreateMenuPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateMenu = async (menu: Omit<Menu, 'id'>) => {
        try {
            const createdMenu = await createMenu(menu);
            if (createdMenu) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el menú',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Menú creado con éxito:', createdMenu);
                navigate('/menu/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el menú',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el menú',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Menú</h2>
            <Breadcrumb pageName="Crear Menú" />
            <MenuForm handleCreate={handleCreateMenu} />
        </div>
    );
};

export default CreateMenuPage;
