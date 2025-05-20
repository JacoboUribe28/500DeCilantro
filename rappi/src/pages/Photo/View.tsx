import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Photo } from '../../models/photo';
import { getPhotoById } from '../../services/photoService';
import Breadcrumb from '../../components/Breadcrumb';

const ViewPhotoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) {
                setError('ID de foto no proporcionado');
                setLoading(false);
                return;
            }
            setLoading(true);
            const data = await getPhotoById(Number(id));
            if (data) {
                setPhoto(data);
                setError(null);
            } else {
                setError('Foto no encontrada');
            }
            setLoading(false);
        };
        fetchPhoto();
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg font-semibold text-gray-700">Cargando foto...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-100 rounded shadow-md mt-6">
                <Breadcrumb pageName="Ver Foto" />
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                    onClick={() => navigate('/photo')}
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
            <Breadcrumb pageName="Ver Foto" />
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Detalles de la Foto</h2>
            {photo ? (
                <div className="space-y-4 text-gray-900 font-medium">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>URL de Imagen:</span>
                        <span>{photo.image_url || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Descripción:</span>
                        <span>{photo.caption || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Fecha de Toma:</span>
                        <span>{formatDate(photo.taken_at)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>ID de Issue:</span>
                        <span>{photo.issue_id !== undefined ? photo.issue_id : 'N/A'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/photo/list')}
                        className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-600 font-semibold">No se encontró la foto.</p>
            )}
        </div>
    );
};

export default ViewPhotoPage;
