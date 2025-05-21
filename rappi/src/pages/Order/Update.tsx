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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrder(prev => {
            if (!prev) return prev;
            if (["quantity", "total_price", "customer_id", "menu_id", "motorcycle_id"].includes(name)) {
                // Convert to number or undefined if empty
                const numValue = value === "" ? undefined : Number(value);
                return { ...prev, [name]: numValue };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleUpdateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!order || !order.id) {
            Swal.fire({
                title: "Error",
                text: "Pedido no cargado correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
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
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/order/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el pedido",
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
                text: "Existe un problema al momento de actualizar el pedido",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!order) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Pedido" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Pedido
                    </h3>
                    <form onSubmit={handleUpdateOrder} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="quantity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Cantidad:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={order.quantity !== undefined ? order.quantity : ''}
                                onChange={handleChange}
                                required
                                min={1}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="total_price" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Precio Total:
                            </label>
                            <input
                                type="number"
                                id="total_price"
                                name="total_price"
                                value={order.total_price !== undefined ? order.total_price : ''}
                                onChange={handleChange}
                                required
                                min={0}
                                step="0.01"
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
                                value={order.status || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="customer_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID Cliente:
                            </label>
                            <input
                                type="number"
                                id="customer_id"
                                name="customer_id"
                                value={order.customer_id !== undefined ? order.customer_id : ''}
                                onChange={handleChange}
                                required
                                min={1}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="menu_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID Menú:
                            </label>
                            <input
                                type="number"
                                id="menu_id"
                                name="menu_id"
                                value={order.menu_id !== undefined ? order.menu_id : ''}
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
                                value={order.motorcycle_id !== undefined ? order.motorcycle_id : ''}
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
                            Actualizar Pedido
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/order/list")}
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

export default UpdateOrderPage;
