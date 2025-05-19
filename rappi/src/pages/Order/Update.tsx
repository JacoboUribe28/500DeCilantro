import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOrderById, updateOrder } from "../../services/orderService";
import Swal from "sweetalert2";

import { Order } from '../../models/order';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateOrderPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            const orderData = await getOrderById(parseInt(id));
            setOrder(orderData);
        };

        fetchOrder();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prev => prev ? { ...prev, [name]: name === 'quantity' || name === 'customer_id' || name === 'menu_id' || name === 'motorcycle_id' ? Number(value) : value } : prev);
    };

    const handleUpdateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!order || !order.id) {
            Swal.fire({
                title: "Error",
                text: "Pedido no cargado correctamente.",
                icon: "error",
                timer: 3000
            });
            return;
        }

        try {
            const updated = await updateOrder(parseInt(order.id), order);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el pedido",
                    icon: "success",
                    timer: 3000
                });
                navigate("/orders");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el pedido",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el pedido",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!order) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Pedido" />
            <form onSubmit={handleUpdateOrder}>
                <div>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={order.quantity ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <div>
                    <label htmlFor="total_price">Precio Total:</label>
                    <input
                        type="number"
                        id="total_price"
                        name="total_price"
                        value={order.total_price ?? ''}
                        onChange={handleChange}
                        required
                        min={0}
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={order.status || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="customer_id">ID del Cliente:</label>
                    <input
                        type="number"
                        id="customer_id"
                        name="customer_id"
                        value={order.customer_id ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <div>
                    <label htmlFor="menu_id">ID del Menú:</label>
                    <input
                        type="number"
                        id="menu_id"
                        name="menu_id"
                        value={order.menu_id ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <div>
                    <label htmlFor="motorcycle_id">ID de la Motocicleta:</label>
                    <input
                        type="number"
                        id="motorcycle_id"
                        name="motorcycle_id"
                        value={order.motorcycle_id ?? ''}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
                <button type="submit">Actualizar Pedido</button>
            </form>
        </>
    );
};

export default UpdateOrderPage;
