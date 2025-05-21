import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAddresses, deleteAddress } from "../../services/addressService";
import Swal from "sweetalert2";
import { Address } from "../../models/address";

const ListAddress = () => {
    const navigate = useNavigate();

    // Estado para almacenar los datos del JSON
    const [data, setData] = useState<Address[]>([]);

    // Llamar `fetchData` cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    // Obtiene los datos de las direcciones
    const fetchData = async () => {
        const addresses = await getAddresses();
        setData(addresses);
    };

    // Funciones para manejar las acciones
    const handleView = (id: number) => {
        navigate(`/address/view/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/address/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        console.log(`Intentando eliminar dirección con ID: ${id}`);
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#black",
        cancelButtonColor: "#black",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No",
        customClass: {
        confirmButton: 'text-black',
        cancelButton: 'text-black'
        }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteAddress(id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El registro se ha eliminado",
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
                            Listado de Direcciones
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Calle</th>
                                        <th scope="col" className="px-6 py-3">Ciudad</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Código Postal</th>
                                        <th scope="col" className="px-6 py-3">Información adicional</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
  {data.map((item) => (
    <tr key={item.id} className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-300">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.street}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.state}</td>
      <td className="px-6 py-4">{item.postal_code}</td> 
      <td className="px-6 py-4">{item.additional_info}</td> 
      <td className="px-6 py-4 space-x-2">
        <button
          onClick={() => handleView(item.id ? parseInt(item.id) : 0)}
          className="text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
          aria-label="Ver dirección"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={() => item.id && handleEdit(parseInt(item.id))}
          className="text-orange-600 dark:text-orange-500 hover:text-orange-800 dark:hover:text-orange-400"
          aria-label="Editar dirección"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={() => item.id && handleDelete(parseInt(item.id))}
          className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400"
          aria-label="Eliminar dirección"
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

export default ListAddress;
