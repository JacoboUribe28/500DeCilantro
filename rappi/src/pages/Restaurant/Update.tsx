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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                navigate("/restaurants");
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
            <form onSubmit={handleUpdateRestaurant}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={restaurant.name || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={restaurant.address || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={restaurant.phone || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={restaurant.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Restaurante</button>
            </form>
        </>
    );
};

export default UpdateRestaurantPage;
