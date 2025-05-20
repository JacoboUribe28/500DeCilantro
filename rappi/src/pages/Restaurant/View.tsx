import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Restaurant } from '../../models/restaurant';
import { getRestaurantById } from '../../services/restaurantService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewRestaurantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) {
                setError('ID de restaurante no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getRestaurantById(Number(id));
            if (data) {
                setRestaurant(data);
                setError(null);
            } else {
                setError('Restaurante no encontrado');
            }
            setLoading(false);
        };
        fetchRestaurant();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando restaurante...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Restaurante" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/restaurant')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Restaurante" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Restaurante</h2>
            {restaurant ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Nombre:</span>
                        <span>{restaurant.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Dirección:</span>
                        <span>{restaurant.address || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Teléfono:</span>
                        <span>{restaurant.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Email:</span>
                        <span>{restaurant.email || 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/restaurant/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el restaurante.</p>
            )}
        </div>
    );
};

export default ViewRestaurantPage;
