import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders, deleteOrder } from "../../services/orderService";
import Swal from "sweetalert2";
import { Order } from "../../models/order";

const ListOrder = () => {
    const navigate = useNavigate();

    // State to store order data
    const [data, setData] = useState<Order[]>([]);

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch orders
    const fetchData = async () => {
        const orders = await getOrders();
        setData(orders);
    };

    // Handlers for actions
    const handleView = (id: number) => {
        navigate(`/order/view/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/order/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        console.log(`Attempting to delete order with ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar este registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "No",
            customClass: {
            confirmButton: 'text-black',
            cancelButton: 'text-black'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteOrder(id);
                if (success) {
                    Swal.fire({
                        title: "Deleted",
                        text: "The record has been deleted",
                        icon: "success",
                        customClass:{
                        confirmButton: 'text-black'
                    }
                    });
                    fetchData();
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado de ordenes
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Cantidad</th>
                                        <th scope="col" className="px-6 py-3">Precio total</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Cliente ID</th>
                                        <th scope="col" className="px-6 py-3">Menu ID</th>
                                        <th scope="col" className="px-6 py-3">Motocicleta ID</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-300">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.quantity}</td>
                                            <td className="px-6 py-4">{item.total_price}</td>
                                            <td className="px-6 py-4">{item.status}</td>
                                            <td className="px-6 py-4">{item.customer_id}</td>
                                            <td className="px-6 py-4">{item.menu_id}</td>
                                            <td className="px-6 py-4">{item.motorcycle_id}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => item.id && handleView(parseInt(item.id))}
                                                    className="text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
                                                    aria-label="View order"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id && handleEdit(parseInt(item.id))}
                                                    className="text-orange-600 dark:text-orange-500 hover:text-orange-800 dark:hover:text-orange-400"
                                                    aria-label="Edit order"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id && handleDelete(parseInt(item.id))}
                                                    className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400"
                                                    aria-label="Delete order"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOrder;
