import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Address } from '../../models/address';
import { getAddressById } from '../../services/addressService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewAddressPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [address, setAddress] = useState<Address | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!id) {
                setError('ID de dirección no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getAddressById(Number(id));
            if (data) {
                setAddress(data);
                setError(null);
            } else {
                setError('Dirección no encontrada');
            }
            setLoading(false);
        };
        fetchAddress();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando dirección...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Dirección" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/address')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Dirección" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles de la Dirección</h2>
            {address ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Calle:</span>
                        <span>{address.street || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Ciudad:</span>
                        <span>{address.city || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Estado:</span>
                        <span>{address.state || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Código Postal:</span>
                        <span>{address.postal_code || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Información Adicional:</span>
                        <span>{address.additional_info || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Order ID:</span>
                        <span>{address.order_id || 'N/A'}</span>
                    </div>
                    <button
                    onClick={() => navigate('/address/list')}
                    className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                    Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró la dirección.</p>
            )}
        </div>
    );
};

export default ViewAddressPage;
