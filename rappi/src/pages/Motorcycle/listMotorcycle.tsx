import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

import { getMotorcycles, deleteMotorcycle } from "../../services/motorcycleService";
import Swal from "sweetalert2";
import { Motorcycle } from "../../models/motorcycle";

const ListMotorcycle = () => {
    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Motorcycle[]>([]);

    // Llamar `fetchData` cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    // Obtiene los datos de las motocicletas
    const fetchData = async () => {
        const motorcycles = await getMotorcycles();
        setData(motorcycles);
    };

    // Funciones para manejar las acciones
    const handleView = (id: string) => {
        console.log(`Ver registro con ID: ${id}`);
        // Lógica para ver el registro
    };

    const handleEdit = (id: string) => {
        console.log(`Editar registro con ID: ${id}`);
        // Lógica para editar el registro
    };

    const handleDelete = async (id: number) => {
        console.log(`Intentando eliminar motocicleta con ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteMotorcycle(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El registro se ha eliminado",
                        icon: "success"
                    });
                    fetchData(); // Refrescar datos tras eliminación
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
                            Listado de Motocicletas
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Placa</th>
                                        <th scope="col" className="px-6 py-3">Marca</th>
                                        <th scope="col" className="px-6 py-3">Año</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.license_plate}</td>
                                            <td className="px-6 py-4">{item.brand}</td>
                                            <td className="px-6 py-4">{item.year}</td>
                                            <td className="px-6 py-4">{item.status}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button
                                                    onClick={() => handleView(item.id ?? "")}
                                                    className="text-blue-600 dark:text-blue-500"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleEdit(item.id)}
                                                    className="text-yellow-600 dark:text-yellow-500"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => item.id !== undefined && handleDelete(Number(item.id))}
                                                    className="text-red-600 dark:text-red-500"
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

export default ListMotorcycle;
