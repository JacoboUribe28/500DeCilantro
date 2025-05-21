import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCustomerById, updateCustomer } from "../../services/customerService";
import Swal from "sweetalert2";

import { Customer } from '../../models/customer';

const UpdateCustomerPage = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) return;
            const customerData = await getCustomerById(parseInt(id));
            setCustomer(customerData);
        };

        fetchCustomer();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleUpdateCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer || !customer.id) {
            Swal.fire({
                title: "Error",
                text: "Los datos del cliente no se cargaron correctamente.",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
            return;
        }

        try {
            const updated = await updateCustomer(parseInt(customer.id), customer);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "El cliente se ha actualizado correctamente",
                    icon: "success",
                    timer: 3000,
                    customClass:{
                        confirmButton: 'text-black'
                    }
                });
                navigate("/customer/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al actualizar el cliente",
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
                text: "Hubo un problema al actualizar el cliente",
                icon: "error",
                timer: 3000,
                customClass:{
                        confirmButton: 'text-black'
                    }
            });
        }
    };

    if (!customer) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex flex-col gap-9 bg-blue-100 p-6.5 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="font-medium text-black dark:text-white mb-6 text-lg">
                Actualizar Cliente
            </h3>
            <form onSubmit={handleUpdateCustomer} className="flex flex-col gap-6">
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customer.name || ''}
                        onChange={handleChange}
                        required
                        className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Correo electrónico:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email || ''}
                        onChange={handleChange}
                        required
                        className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Teléfono:
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={customer.phone || ''}
                        onChange={handleChange}
                        required
                        className="rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90"
                >
                    Actualizar Cliente
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/customer/list")}
                    className="mt-2 inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                    Volver a la lista
                </button>
            </form>
        </div>
    );
};

export default UpdateCustomerPage;
