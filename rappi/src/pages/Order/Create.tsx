import React, { useState } from 'react';
import { Order } from '../../models/order';
import { createOrder } from '../../services/orderService';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const OrderForm: React.FC<{ handleCreate: (order: Omit<Order, 'id'>) => void }> = ({ handleCreate }) => {
    const [quantity, setQuantity] = useState<number | ''>('');
    const [totalPrice, setTotalPrice] = useState<number | ''>('');
    const [status, setStatus] = useState('');
    const [customerId, setCustomerId] = useState<number | ''>('');
    const [menuId, setMenuId] = useState<number | ''>('');
    const [motorcycleId, setMotorcycleId] = useState<number | ''>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCreate({
            quantity: quantity === '' ? undefined : quantity,
            total_price: totalPrice === '' ? undefined : totalPrice,
            status,
            customer_id: customerId === '' ? undefined : customerId,
            menu_id: menuId === '' ? undefined : menuId,
            motorcycle_id: motorcycleId === '' ? undefined : motorcycleId,
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block mb-1 font-semibold">Cantidad</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    min={1}
                    required
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Precio Total</label>
                <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    min={0}
                    step="0.01"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Estado</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID del Cliente</label>
                <input
                    type="number"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID del Menú</label>
                <input
                    type="number"
                    value={menuId}
                    onChange={(e) => setMenuId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">ID de la Motocicleta</label>
                <input
                    type="number"
                    value={motorcycleId}
                    onChange={(e) => setMotorcycleId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Crear Orden
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
                    text: 'Se ha creado correctamente la orden',
                    icon: 'success',
                    timer: 3000,
                });
                console.log('Orden creada con éxito:', createdOrder);
                navigate('/orders');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Existe un problema al momento de crear la orden',
                    icon: 'error',
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear la orden',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Orden</h2>
            <Breadcrumb pageName="Crear Orden" />
            <OrderForm handleCreate={handleCreateOrder} />
        </div>
    );
};

export default CreateOrderPage;
