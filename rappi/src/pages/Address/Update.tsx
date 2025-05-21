import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAddressById, updateAddress } from "../../services/addressService";
import Swal from "sweetalert2";

import { Address } from '../../models/address';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateAddressPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [address, setAddress] = useState<Address | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!id) return;
            const addressData = await getAddressById(parseInt(id));
            setAddress(addressData);
        };

        fetchAddress();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddress(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address || !address.id) {
            Swal.fire({
                title: "Error",
                text: "Dirección no cargada correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
            return;
        }

        try {
            const updated = await updateAddress(parseInt(address.id), address);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente la dirección",
                    icon: "success",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/address/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar la dirección",
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
                text: "Existe un problema al momento de actualizar la dirección",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!address) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Dirección" />
            <div className="flex flex-col gap-9 bg-blue-100">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
                    <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                        Actualizar Dirección
                    </h3>
                    <form onSubmit={handleUpdateAddress} className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="street" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Calle:
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={address.street || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Ciudad:
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={address.city || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="state" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Estado:
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={address.state || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="postal_code" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Código Postal:
                            </label>
                            <input
                                type="text"
                                id="postal_code"
                                name="postal_code"
                                value={address.postal_code || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="additional_info" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Información Adicional:
                            </label>
                            <textarea
                                id="additional_info"
                                name="additional_info"
                                value={address.additional_info || ''}
                                onChange={handleChange}
                                className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="order_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ID de Pedido:
                            </label>
                            <input
                                type="text"
                                id="order_id"
                                name="order_id"
                                value={address.order_id || ''}
                                onChange={handleChange}
                                required
                                className="rounded border border-black-300 bg-gray-50 px-4 py-2 text-black-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                        >
                            Actualizar Dirección
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/address/list")}
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
export default UpdateAddressPage;
