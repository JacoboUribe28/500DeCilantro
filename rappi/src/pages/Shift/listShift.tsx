import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getShifts, deleteShift } from "../../services/shiftService";
import Swal from "sweetalert2";
import { Shift } from "../../models/shift";

const ListShift = () => {
    const navigate = useNavigate();

    // State to store shift data
    const [data, setData] = useState<Shift[]>([]);

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch shifts
    const fetchData = async () => {
        const shifts = await getShifts();
        setData(shifts);
    };

    // Handlers for actions
    const handleView = (id: number) => {
        navigate(`/shift/view/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/shift/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        console.log(`Attempting to delete shift with ID: ${id}`);
        Swal.fire({
            title: "Delete",
            text: "Are you sure you want to delete this record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteShift(id);
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
                            Shift List
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Start Time</th>
                                        <th scope="col" className="px-6 py-3">End Time</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Driver ID</th>
                                        <th scope="col" className="px-6 py-3">Motorcycle ID</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-300">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.start_time ? new Date(item.start_time).toLocaleString() : ""}</td>
                                            <td className="px-6 py-4">{item.end_time ? new Date(item.end_time).toLocaleString() : ""}</td>
                                            <td className="px-6 py-4">{item.status}</td>
                                            <td className="px-6 py-4">{item.driver_id}</td>
                                            <td className="px-6 py-4">{item.motorcycle_id}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => item.id && handleView(parseInt(item.id))}
                                                    className="text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
                                                    aria-label="View shift"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id && handleEdit(parseInt(item.id))}
                                                    className="text-orange-600 dark:text-orange-500 hover:text-orange-800 dark:hover:text-orange-400"
                                                    aria-label="Edit shift"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id && handleDelete(parseInt(item.id))}
                                                    className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400"
                                                    aria-label="Delete shift"
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

export default ListShift;
