import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getRestaurantById, updateRestaurant } from "../../services/restaurantService";
import Swal from "sweetalert2";

import { Restaurant } from '../../models/restaurant';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateRestaurantPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;
            const restaurantData = await getRestaurantById(parseInt(id));
            setRestaurant(restaurantData);
        };

        fetchRestaurant();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRestaurant(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!restaurant || !restaurant.id) {
            Swal.fire({
                title: "Error",
                text: "Restaurante no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateRestaurant(parseInt(restaurant.id), restaurant);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el restaurante",
                    icon: "success",
                    timer: 3000
                });
                navigate("/restaurant/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el restaurante",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el restaurante",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!restaurant) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Restaurante" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Restaurante
                    </h3>
                    <form onSubmit={handleUpdateRestaurant} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={restaurant.name || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Dirección:
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={restaurant.address || ''}
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
                                value={restaurant.phone || ''}
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
                                value={restaurant.email || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Restaurante
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/restaurant/list")}
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

export default UpdateRestaurantPage;
