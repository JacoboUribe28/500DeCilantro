import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRestaurants, deleteRestaurant } from "../../services/restaurantService";
import Swal from "sweetalert2";
import { Restaurant } from "../../models/restaurant";

const ListRestaurant = () => {
    const navigate = useNavigate();

    // State to store restaurant data
    const [data, setData] = useState<Restaurant[]>([]);

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch restaurants
    const fetchData = async () => {
        const restaurants = await getRestaurants();
        setData(restaurants);
    };

    // Handlers for actions
    const handleView = (id: number) => {
        navigate(`/restaurant/view/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/restaurant/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        console.log(`Attempting to delete restaurant with ID: ${id}`);
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
                const success = await deleteRestaurant(id);
                if (success) {
                    Swal.fire({
                        title: "Deleted",
                        text: "The record has been deleted",
                        icon: "success"
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
                            Listado de restaurantes
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Dirección</th>
                                        <th scope="col" className="px-6 py-3">Teléfono</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-300">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                            <td className="px-6 py-4">{item.address}</td>
                                            <td className="px-6 py-4">{item.phone}</td>
                                            <td className="px-6 py-4">{item.email}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => item.id && handleView(parseInt(item.id))}
                                                    className="text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
                                                    aria-label="View restaurant"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id && handleEdit(parseInt(item.id))}
                                                    className="text-orange-600 dark:text-orange-500 hover:text-orange-800 dark:hover:text-orange-400"
                                                    aria-label="Edit restaurant"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id && handleDelete(parseInt(item.id))}
                                                    className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400"
                                                    aria-label="Delete restaurant"
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

export default ListRestaurant;
