import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu } from '../../models/menu';
import { getMenuById } from '../../services/menuService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewMenuPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!id) {
                setError('ID de menú no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getMenuById(Number(id));
            if (data) {
                setMenu(data);
                setError(null);
            } else {
                setError('Menú no encontrado');
            }
            setLoading(false);
        };
        fetchMenu();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando menú...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Menú" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/menu')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Menú" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Menú</h2>
            {menu ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Precio:</span>
                        <span>{menu.price !== undefined ? menu.price : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Disponibilidad:</span>
                        <span>{menu.availbality !== undefined ? (menu.availbality ? 'Sí' : 'No') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID del Restaurante:</span>
                        <span>{menu.restaurant_id !== undefined ? menu.restaurant_id : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID del Producto:</span>
                        <span>{menu.product_id !== undefined ? menu.product_id : 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/menu/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el menú.</p>
            )}
        </div>
    );
};

export default ViewMenuPage;
