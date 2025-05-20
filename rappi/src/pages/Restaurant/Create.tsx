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
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Restaurante</h3>
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
                <label className="block mb-2 font-semibold text-gray-700">Dirección</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la dirección"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Teléfono</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el teléfono"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el correo electrónico"
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
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
                navigate('/restaurant/list');
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
