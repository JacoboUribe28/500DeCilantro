import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPhotoById, updatePhoto } from "../../services/photoService";
import Swal from "sweetalert2";

import { Photo } from '../../models/photo';
import Breadcrumb from "../../components/Breadcrumb";

const UpdatePhotoPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) return;
            const photoData = await getPhotoById(parseInt(id));
            setPhoto(photoData);
        };

        fetchPhoto();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPhoto(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPhoto(prev => ({
            ...prev,
            [name]: value ? new Date(value) : undefined,
        }));
    };

    const handleUpdatePhoto = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!photo || !photo.id) {
            Swal.fire({
                title: "Error",
                text: "Foto no cargada correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updatePhoto(parseInt(photo.id), photo);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la foto",
                    icon: "success",
                    timer: 3000
                });
                navigate("/photos");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar la foto",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar la foto",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!photo) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Foto" />
            <form onSubmit={handleUpdatePhoto}>
                <div>
                    <label htmlFor="image_url">URL de la Imagen:</label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={photo.image_url || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="caption">Descripción:</label>
                    <textarea
                        id="caption"
                        name="caption"
                        value={photo.caption || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="taken_at">Fecha de la Foto:</label>
                    <input
                        type="datetime-local"
                        id="taken_at"
                        name="taken_at"
                        value={photo.taken_at ? new Date(photo.taken_at).toISOString().slice(0, 16) : ''}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label htmlFor="issue_id">ID del Issue:</label>
                    <input
                        type="number"
                        id="issue_id"
                        name="issue_id"
                        value={photo.issue_id ?? ''}
                        onChange={handleChange}
                        min={1}
                    />
                </div>
                <button type="submit">Actualizar Foto</button>
            </form>
        </>
    );
};

export default UpdatePhotoPage;
