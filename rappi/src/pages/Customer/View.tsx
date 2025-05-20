import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Customer } from '../../models/customer';
import { getCustomerById } from '../../services/customerService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewCustomerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) {
                setError('ID de cliente no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getCustomerById(Number(id));
            if (data) {
                setCustomer(data);
                setError(null);
            } else {
                setError('Cliente no encontrado');
            }
            setLoading(false);
        };
        fetchCustomer();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando cliente...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Cliente" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/customer')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Cliente" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Cliente</h2>
            {customer ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Nombre:</span>
                        <span>{customer.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Email:</span>
                        <span>{customer.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Teléfono:</span>
                        <span>{customer.phone || 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/customer/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el cliente.</p>
            )}
        </div>
    );
};

export default ViewCustomerPage;
