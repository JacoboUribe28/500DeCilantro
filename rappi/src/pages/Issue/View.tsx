import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Issue } from '../../models/issue';
import { getIssueById } from '../../services/issueService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewIssuePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            if (!id) {
                setError('ID de issue no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getIssueById(Number(id));
            if (data) {
                setIssue(data);
                setError(null);
            } else {
                setError('Issue no encontrado');
            }
            setLoading(false);
        };
        fetchIssue();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando issue...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Issue" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/issue')}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded shadow-md transition duration-300"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    const formatDate = (dateString?: string | Date) => {
        if (!dateString) return 'N/A';
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return date.toLocaleDateString();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
            <Breadcrumb pageName="Ver Issue" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles del Issue</h2>
            {issue ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Descripción:</span>
                        <span>{issue.description || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Tipo de Issue:</span>
                        <span>{issue.issue_type || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Fecha Reportada:</span>
                        <span>{formatDate(issue.date_reported)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Estado:</span>
                        <span>{issue.status || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Motocicleta:</span>
                        <span>{issue.motorcycle_id !== undefined ? issue.motorcycle_id : 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/issue/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró el issue.</p>
            )}
        </div>
    );
};

export default ViewIssuePage;
