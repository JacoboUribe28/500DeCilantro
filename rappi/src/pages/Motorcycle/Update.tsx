import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMotorcycleById, updateMotorcycle } from "../../services/motorcycleService";
import Swal from "sweetalert2";

import { Motorcycle } from '../../models/motorcycle';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateMotorcyclePage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    useEffect(() => {
        const fetchMotorcycle = async () => {
            if (!id) return;
            const motorcycleData = await getMotorcycleById(parseInt(id));
            setMotorcycle(motorcycleData);
        };

        fetchMotorcycle();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMotorcycle(prev => {
            if (!prev) return prev;
            if (name === "year") {
                // Convert year to number or undefined if empty
                const yearValue = value === "" ? undefined : parseInt(value);
                return { ...prev, [name]: yearValue };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleUpdateMotorcycle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!motorcycle || !motorcycle.id) {
            Swal.fire({
                title: "Error",
                text: "Motocicleta no cargada correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateMotorcycle(parseInt(motorcycle.id), motorcycle);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la motocicleta",
                    icon: "success",
                    timer: 3000
                });
                navigate("/motorcycle/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar la motocicleta",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar la motocicleta",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!motorcycle) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Motocicleta" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Motocicleta
                    </h3>
                    <form onSubmit={handleUpdateMotorcycle} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="license_plate" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Placa:
                            </label>
                            <input
                                type="text"
                                id="license_plate"
                                name="license_plate"
                                value={motorcycle.license_plate || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="brand" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Marca:
                            </label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={motorcycle.brand || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="year" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Año:
                            </label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={motorcycle.year !== undefined ? motorcycle.year : ''}
                                onChange={handleChange}
                                required
                                min={1900}
                                max={2100}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Estado:
                            </label>
                            <input
                                type="text"
                                id="status"
                                name="status"
                                value={motorcycle.status || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Motocicleta
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/motorcycle/list")}
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

export default UpdateMotorcyclePage;
