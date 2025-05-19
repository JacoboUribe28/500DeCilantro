import React, { useState } from 'react';
import { Restaurant } from '../../models/restaurant';
import { createRestaurant } from '../../services/restaurantService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const RestaurantForm: React.FC<{ handleCreate: (restaurant: Omit<Restaurant, 'id'>) => void }> = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            name,
            address,
            phone,
            email,
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
                <label className="block mb-1 font-semibold">Dirección</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Teléfono</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Crear Restaurante
            </button>
        </form>
    );
};

const CreateRestaurantPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateRestaurant = async (restaurant: Omit<Restaurant, 'id'>) => {
        try {
            const createdRestaurant = await createRestaurant(restaurant);
            if (createdRestaurant) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el restaurante',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Restaurante creado con éxito:', createdRestaurant);
                navigate('/restaurants');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el restaurante',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el restaurante',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Restaurante</h2>
            <Breadcrumb pageName="Crear Restaurante" />
            <RestaurantForm handleCreate={handleCreateRestaurant} />
        </div>
    );
};

export default CreateRestaurantPage;
