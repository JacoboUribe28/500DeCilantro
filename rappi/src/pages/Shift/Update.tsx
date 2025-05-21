import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getShiftById, updateShift } from "../../services/shiftService";
import Swal from "sweetalert2";

import { Shift } from '../../models/shift';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateShiftPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [shift, setShift] = useState<Shift | null>(null);

    useEffect(() => {
        const fetchShift = async () => {
            if (!id) return;
            const shiftData = await getShiftById(parseInt(id));
            setShift(shiftData);
        };

        fetchShift();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShift(prev => {
            if (!prev) return prev;
            if (name === "driver_id" || name === "motorcycle_id") {
                const numValue = value === "" ? undefined : Number(value);
                return { ...prev, [name]: numValue };
            }
            if (name === "start_time" || name === "end_time") {
                const dateValue = value === "" ? undefined : new Date(value);
                return { ...prev, [name]: dateValue };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleUpdateShift = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!shift || !shift.id) {
            Swal.fire({
                title: "Error",
                text: "Turno no cargado correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
            return;
        }

        try {
            const updated = await updateShift(parseInt(shift.id), shift);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el turno",
                    icon: "success",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/shift/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el turno",
                    icon: "error",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el turno",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!shift) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Turno" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Turno
                    </h3>
                    <form onSubmit={handleUpdateShift} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="start_time" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Hora de Inicio:
                            </label>
                            <input
                                type="datetime-local"
                                id="start_time"
                                name="start_time"
                                value={shift.start_time ? new Date(shift.start_time).toISOString().slice(0,16) : ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="end_time" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Hora de Fin:
                            </label>
                            <input
                                type="datetime-local"
                                id="end_time"
                                name="end_time"
                                value={shift.end_time ? new Date(shift.end_time).toISOString().slice(0,16) : ''}
                                onChange={handleChange}
                                required
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
                                value={shift.status || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="driver_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID Conductor:
                            </label>
                            <input
                                type="number"
                                id="driver_id"
                                name="driver_id"
                                value={shift.driver_id !== undefined ? shift.driver_id : ''}
                                onChange={handleChange}
                                required
                                min={1}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="motorcycle_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID Motocicleta:
                            </label>
                            <input
                                type="number"
                                id="motorcycle_id"
                                name="motorcycle_id"
                                value={shift.motorcycle_id !== undefined ? shift.motorcycle_id : ''}
                                onChange={handleChange}
                                required
                                min={1}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Turno
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/shift/list")}
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

export default UpdateShiftPage;
