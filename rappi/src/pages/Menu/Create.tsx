import React, { useState } from 'react';
import { Menu } from '../../models/menu';
import { createMenu } from '../../services/menuService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const MenuForm: React.FC<{ handleCreate: (menu: Omit<Menu, 'id'>) => void }> = ({ handleCreate }) => {
    const [price, setPrice] = useState<number | ''>('');
    const [availability, setAvailability] = useState(false);
    const [restaurantId, setRestaurantId] = useState<number | ''>('');
    const [productId, setProductId] = useState<number | ''>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            price: price === '' ? undefined : price,
            availbality: availability,
            restaurant_id: restaurantId === '' ? undefined : restaurantId,
            product_id: productId === '' ? undefined : productId,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Precio</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    required
                    min={0}
                    step="0.01"
                />
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    id="availability"
                />
                <label htmlFor="availability" className="font-semibold">Disponibilidad</label>
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID del Restaurante</label>
                <input
                    type="number"
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID del Producto</label>
                <input
                    type="number"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                navigate('/menus');
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
