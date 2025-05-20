import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shift } from '../../models/shift';
import { getShiftById } from '../../services/shiftService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewShiftPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [shift, setShift] = useState<Shift | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShift = async () => {
            if (!id) {
                setError('ID de turno no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getShiftById(Number(id));
            if (data) {
                setShift(data);
                setError(null);
            } else {
                setError('Turno no encontrado');
            }
            setLoading(false);
        };
        fetchShift();
    }, [id]);

    const formatDateTime = (dateString?: string | Date) => {
        if (!dateString) return 'N/A';
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return date.toLocaleString();
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando turno...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Turno" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/shift')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Turno" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Turno</h2>
            {shift ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Hora de Inicio:</span>
                        <span>{formatDateTime(shift.start_time)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Hora de Fin:</span>
                        <span>{formatDateTime(shift.end_time)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Estado:</span>
                        <span>{shift.status || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Conductor:</span>
                        <span>{shift.driver_id !== undefined ? shift.driver_id : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Motocicleta:</span>
                        <span>{shift.motorcycle_id !== undefined ? shift.motorcycle_id : 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/shift/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el turno.</p>
            )}
        </div>
    );
};

export default ViewShiftPage;
