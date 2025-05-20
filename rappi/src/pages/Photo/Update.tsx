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
        setPhoto(prev => {
            if (!prev) return prev;
            if (name === "issue_id") {
                const numValue = value === "" ? undefined : Number(value);
                return { ...prev, [name]: numValue };
            }
            if (name === "taken_at") {
                // Convert string to Date object or undefined if empty
                const dateValue = value === "" ? undefined : new Date(value);
                return { ...prev, [name]: dateValue };
            }
            return { ...prev, [name]: value };
        });
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
                navigate("/photo/list");
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
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Foto
                    </h3>
                    <form onSubmit={handleUpdatePhoto} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="image_url" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                URL de Imagen:
                            </label>
                            <input
                                type="text"
                                id="image_url"
                                name="image_url"
                                value={photo.image_url || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="caption" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Leyenda:
                            </label>
                            <input
                                type="text"
                                id="caption"
                                name="caption"
                                value={photo.caption || ''}
                                onChange={handleChange}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="taken_at" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fecha de Toma:
                            </label>
                            <input
                                type="datetime-local"
                                id="taken_at"
                                name="taken_at"
                                value={photo.taken_at ? new Date(photo.taken_at).toISOString().slice(0,16) : ''}
                                onChange={handleChange}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="issue_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID de Incidencia:
                            </label>
                            <input
                                type="number"
                                id="issue_id"
                                name="issue_id"
                                value={photo.issue_id !== undefined ? photo.issue_id : ''}
                                onChange={handleChange}
                                min={1}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Foto
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/photo/list")}
                            className="mt-2 inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            Volver a la lista
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdatePhotoPage;
