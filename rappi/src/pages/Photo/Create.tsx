import React, { useState } from 'react';
import { Photo } from '../../models/photo';
import { createPhoto } from '../../services/photoService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const PhotoForm: React.FC<{ handleCreate: (photo: Omit<Photo, 'id'>) => void }> = ({ handleCreate }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [takenAt, setTakenAt] = useState('');
    const [issueId, setIssueId] = useState<number | ''>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            image_url: imageUrl,
            caption,
            taken_at: takenAt ? new Date(takenAt) : undefined,
            issue_id: issueId === '' ? undefined : issueId,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">URL de la Imagen</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Fecha de Toma</label>
                <input
                    type="date"
                    value={takenAt}
                    onChange={(e) => setTakenAt(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID de la Incidencia</label>
                <input
                    type="number"
                    value={issueId}
                    onChange={(e) => setIssueId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Crear Foto
            </button>
        </form>
    );
};

const CreatePhotoPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreatePhoto = async (photo: Omit<Photo, 'id'>) => {
        try {
            const createdPhoto = await createPhoto(photo);
            if (createdPhoto) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente la foto',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Foto creada con éxito:', createdPhoto);
                navigate('/photos');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la foto',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la foto',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Foto</h2>
            <Breadcrumb pageName="Crear Foto" />
            <PhotoForm handleCreate={handleCreatePhoto} />
        </div>
    );
};

export default CreatePhotoPage;
