import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDriverById, updateDriver } from "../../services/driverService";
import Swal from "sweetalert2";

import { Driver } from '../../models/driver';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateDriverPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        const fetchDriver = async () => {
            if (!id) return;
            const driverData = await getDriverById(parseInt(id));
            setDriver(driverData);
        };

        fetchDriver();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDriver(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateDriver = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!driver || !driver.id) {
            Swal.fire({
                title: "Error",
                text: "Conductor no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateDriver(parseInt(driver.id), driver);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el conductor",
                    icon: "success",
                    timer: 3000
                });
                navigate("/driver/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el conductor",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el conductor",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!driver) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Conductor" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Conductor
                    </h3>
                    <form onSubmit={handleUpdateDriver} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={driver.name || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="license_number" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Número de Licencia:
                            </label>
                            <input
                                type="text"
                                id="license_number"
                                name="license_number"
                                value={driver.license_number || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={driver.email || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Teléfono:
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={driver.phone || ''}
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
                                value={driver.status || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Conductor
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/driver/list")}
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

export default UpdateDriverPage;
