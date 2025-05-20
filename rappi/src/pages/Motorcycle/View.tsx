import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Motorcycle } from '../../models/motorcycle';
import { getMotorcycleById } from '../../services/motorcycleService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewMotorcyclePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMotorcycle = async () => {
            if (!id) {
                setError('ID de motocicleta no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getMotorcycleById(Number(id));
            if (data) {
                setMotorcycle(data);
                setError(null);
            } else {
                setError('Motocicleta no encontrada');
            }
            setLoading(false);
        };
        fetchMotorcycle();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando motocicleta...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Motocicleta" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/motorcycle')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Motocicleta" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles de la Motocicleta</h2>
            {motorcycle ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Placa:</span>
                        <span>{motorcycle.license_plate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Marca:</span>
                        <span>{motorcycle.brand || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Año:</span>
                        <span>{motorcycle.year !== undefined ? motorcycle.year : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Estado:</span>
                        <span>{motorcycle.status || 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/motorcycle/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró la motocicleta.</p>
            )}
        </div>
    );
};

export default ViewMotorcyclePage;
