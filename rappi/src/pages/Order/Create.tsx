import React, { useState } from 'react';
import { Order } from '../../models/order';
import { createOrder } from '../../services/orderService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const OrderForm: React.FC<{ handleCreate: (order: Omit<Order, 'id'>) => void }> = ({ handleCreate }) => {
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [status, setStatus] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [menuId, setMenuId] = useState('');
    const [motorcycleId, setMotorcycleId] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            quantity: quantity ? Number(quantity) : undefined,
            total_price: totalPrice ? Number(totalPrice) : undefined,
            status,
            customer_id: customerId ? Number(customerId) : undefined,
            menu_id: menuId ? Number(menuId) : undefined,
            motorcycle_id: motorcycleId ? Number(motorcycleId) : undefined,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Nuevo Pedido</h3>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Cantidad</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese la cantidad"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Precio Total</label>
                <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el precio total"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Estado</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el estado"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID del Cliente</label>
                <input
                    type="number"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID del cliente"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID del Menú</label>
                <input
                    type="number"
                    value={menuId}
                    onChange={(e) => setMenuId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID del menú"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-gray-700">ID de la Motocicleta</label>
                <input
                    type="number"
                    value={motorcycleId}
                    onChange={(e) => setMotorcycleId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Ingrese el ID de la motocicleta"
                    required
                />
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
                Crear Pedido
            </button>
        </form>
    );
};

const CreateOrderPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateOrder = async (order: Omit<Order, 'id'>) => {
        try {
            const createdOrder = await createOrder(order);
            if (createdOrder) {
                Swal.fire({
                    title: 'Completado',
                    text: 'Se ha creado correctamente el pedido',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Pedido creado con éxito:', createdOrder);
                navigate('/order/list');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear el pedido',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear el pedido',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Pedido</h2>
            <Breadcrumb pageName="Crear Pedido" />
            <OrderForm handleCreate={handleCreateOrder} />
        </div>
    );
};

export default CreateOrderPage;
