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
    const [issueId, setIssueId] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            image_url: imageUrl,
            caption,
            taken_at: takenAt ? new Date(takenAt) : undefined,
            issue_id: issueId ? Number(issueId) : undefined,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nueva Foto</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">URL de la Imagen</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la URL de la imagen"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Descripción</label>
                <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la descripción"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Fecha de la Foto</label>
                <input
                    type="date"
                    value={takenAt}
                    onChange={(e) => setTakenAt(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID del Issue</label>
                <input
                    type="number"
                    value={issueId}
                    onChange={(e) => setIssueId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID del issue"
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
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
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                console.log('Foto creada con éxito:', createdPhoto);
                navigate('/photo/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la foto',
                    icon: 'error',
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la foto',
                icon: 'error',
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
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
