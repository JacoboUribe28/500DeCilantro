import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '../../models/order';
import { getOrderById } from '../../services/orderService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewOrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) {
                setError('ID de pedido no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getOrderById(Number(id));
            if (data) {
                setOrder(data);
                setError(null);
            } else {
                setError('Pedido no encontrado');
            }
            setLoading(false);
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando pedido...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Pedido" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/order')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Pedido" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Pedido</h2>
            {order ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Cantidad:</span>
                        <span>{order.quantity !== undefined ? order.quantity : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Precio Total:</span>
                        <span>{order.total_price !== undefined ? order.total_price : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Estado:</span>
                        <span>{order.status || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Cliente:</span>
                        <span>{order.customer_id !== undefined ? order.customer_id : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Menú:</span>
                        <span>{order.menu_id !== undefined ? order.menu_id : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Motocicleta:</span>
                        <span>{order.motorcycle_id !== undefined ? order.motorcycle_id : 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/order/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el pedido.</p>
            )}
        </div>
    );
};

export default ViewOrderPage;
